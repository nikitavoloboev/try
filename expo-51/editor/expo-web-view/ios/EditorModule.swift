import ExpoModulesCore

public class ExpoWebViewModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoWebView")

    View(ExpoWebView.self) {}
  }
}
