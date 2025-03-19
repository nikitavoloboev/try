import {
  Account,
  CoFeed,
  CoList,
  CoMap,
  FileStream,
  Group,
  Profile,
  SchemaUnion,
  co,
} from "jazz-tools"

export class BaseReaction extends CoMap {
  type = co.string
}

export class ThumbUpReaction extends BaseReaction {
  type = co.literal("thumb-up")
}

export class ThumbDownReaction extends BaseReaction {
  type = co.literal("thumb-down")
}

const Reaction = SchemaUnion.Of<BaseReaction>((raw) => {
  switch (raw.get("type")) {
    case "thumb-up":
      return ThumbUpReaction
    case "thumb-down":
      return ThumbDownReaction
    default:
      throw new Error("Unknown reaction type")
  }
})

export class ReactionsList extends CoList.Of(co.ref(Reaction)) {}

// Main entities
export class Tag extends CoMap {
  name = co.string
  color = co.optional.string
  deleted = co.optional.boolean
}

export class TagList extends CoList.Of(co.ref(Tag)) {}

export class Attachment extends CoMap {
  file = co.ref(FileStream)
  type = co.literal("image", "video", "audio", "document", "other")
}

export class AttachmentList extends CoList.Of(co.ref(Attachment)) {}

export class Comment extends CoMap {
  content = co.string
  issue = co.ref(Issue)
  deleted = co.optional.boolean
  reactions = co.ref(ReactionsList)
  attachments = co.ref(AttachmentList)
}

export class CommentList extends CoList.Of(co.ref(Comment)) {}

export class Issue extends CoMap {
  title = co.string
  description = co.string
  status = co.literal("open", "in_progress", "resolved", "closed")
  priority = co.literal("low", "medium", "high", "critical")
  estimate = co.number
  dueDate = co.optional.Date
  attachments = co.ref(AttachmentList)
  deleted = co.optional.boolean
  tags = co.ref(TagList)
  comments = co.ref(CommentList)
  reactions = co.ref(ReactionsList)
}

export class IssueList extends CoList.Of(co.ref(Issue)) {}

export class Project extends CoMap {
  name = co.string
  description = co.optional.string
  status = co.literal("active", "archived", "completed")
  issues = co.ref(IssueList)
  deleted = co.optional.boolean
}

export class ProjectList extends CoList.Of(co.ref(Project)) {}

export class Team extends CoMap {
  name = co.string
  projects = co.ref(ProjectList)
  liveUpdates = co.ref(
    CoFeed.Of(
      co.json<{
        type: "presence" | "reaction" | "comment" | "issue"
        data: Record<string, string>
      }>(),
    ),
  )
  deleted = co.optional.boolean
}

export class TeamList extends CoList.Of(co.ref(Team)) {}

export class Container extends CoMap {
  teams = co.ref(TeamList)
}

export class AccountRoot extends CoMap {
  container = co.ref(Container)
  version = co.optional.number
}

export class UserProfile extends Profile {
  name = co.string

  static validate(data: { name?: string; other?: Record<string, unknown> }) {
    const errors: string[] = []
    if (!data.name?.trim()) {
      errors.push("Please enter a name")
    }
    return { errors }
  }
}

export class JazzAccount extends Account {
  profile = co.ref(UserProfile)
  root = co.ref(AccountRoot)

  async migrate(creationProps?: {
    name: string
    other?: Record<string, unknown>
  }) {
    if (!this._refs.root && creationProps) {
      await this.initialMigration(creationProps)
      return
    }

    // uncomment this to add migrations
    // const currentVersion = this.root?.version || 0;
    // if (currentVersion < 1) {
    //   await this.migrationV1();
    // }
  }

  private async initialMigration(creationProps: {
    name: string
    other?: Record<string, unknown>
  }) {
    const { name, other } = creationProps
    const profileErrors = UserProfile.validate({ name, ...other })
    if (profileErrors.errors.length > 0) {
      throw new Error(
        `Invalid profile data: ${profileErrors.errors.join(", ")}`,
      )
    }

    const publicGroup = Group.create({ owner: this })
    publicGroup.addMember("everyone", "reader")

    this.profile = UserProfile.create(
      { name, ...other },
      { owner: publicGroup },
    )

    const privateGroup = Group.create({ owner: this })

    // Create initial container with empty collections
    const defaultContainer = Container.create(
      {
        teams: TeamList.create([], { owner: privateGroup }),
      },
      { owner: privateGroup },
    )

    // Initialize root structure with version
    this.root = AccountRoot.create(
      {
        container: defaultContainer,
        version: 0, // Set initial version
        // here owner is always "this" Account
      },
      { owner: this },
    )
  }
}
