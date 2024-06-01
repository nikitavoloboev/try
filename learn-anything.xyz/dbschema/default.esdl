using extension auth;

module default {
  scalar type Role extending enum<admin, user>;
  global current_user := (
    assert_single((
      select User
      filter .identity = global ext::auth::ClientTokenIdentity
    ))
  );
  type User {
    required identity: ext::auth::Identity;
    email: str {
      constraint exclusive;
    };
    # learn-anything.xyz/@{name}
    name: str {
      constraint exclusive;
    };
    # pretty name of user (same as X username/name split)
    displayName: str;
    bio: str;
    userRole: Role {
      default := "user";
    };
    created: datetime {
      rewrite insert using (datetime_of_statement());
    }
    updated: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement());
    }
  }
  # global state for app (not tied to anything)
  type GlobalState extending Singleton {
  }
  # context: https://discord.com/channels/841451783728529451/1238513266167386163/1238580664669044817
  abstract type Singleton {
    delegated constraint exclusive on (true);
  }
}
