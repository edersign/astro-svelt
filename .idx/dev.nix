{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # Or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.bun
    pkgs.pnpm
    pkgs.npm-check-updates
    pkgs.nodejs_22
  ];
  # Sets environment variables in the workspace
  env = { HOME = "/home/user"; };
  # Fast way to run scripts. Use a script name on the left and the script
  # on the right. You can use wildcards on the left for file patterns and
  # on the right to reference the file that was matched.
  #
  # Example:
  #
  # replit.nix = {
  #   "*.py" = {
  #     command = ["python", "$file"];
  #   };
  # };
  idx.scripts = {};

  # You can change the language and packages of your environment.
  # A full list of options is available at https://idx.dev/reference/dev-nix
  idx.workspace = {
    vscode = {
      extensions = [
        "ms-vscode.vscode-typescript-next"
        "svelte.svelte-vscode"
        "unifiedjs.vscode-mdx"
        "csstools.postcss"
        "Vue.volar"
        "ms-playwright.playwright"
        "esbenp.prettier-vscode"
        "dbaeumer.vscode-eslint"
        "bradlc.vscode-tailwindcss"
        "ms-vscode.brackets-keybindings"
        "ms-vscode.brackets-pack"
        "astro-build.astro-vscode"
        "christian-kohler.path-intellisense"
        "CoenraadS.bracket-pair-colorizer-2"
        "EditorConfig.EditorConfig"
        "formulahendry.auto-close-tag"
        "formulahendry.auto-rename-tag"
        "google.gemini-cli-vscode-ide-companion"
        "pranaygp.vscode-css-peek"
        "ritwickdey.LiveServer"
        "Zignd.html-css-class-completion"
        ];
      
      # Enable previews and customize configuration
       # Enable previews
      previews = {
        enable = true;
        previews = [
          {
            # Example: run "npm run dev" with PORT set to IDX's defined port for previews,
            # and show it in IDX's web preview panel
           web = {
            command =
              [ "pnpm" "run" "dev" "--" "--port" "$PORT" "--hostname" "0.0.0.0" ];
            manager = "web";
          };
          }
        ];
      };
    };
  };
  
  # The following describes the NixOS configuration that should be used in
  # your workspace. This is where you'll put almost all of your NixOS
  # configuration.
  #
  # The docs for all available options are available at
  # https://search.nixos.org/options
  #
  # The following is a sample configuration that sets up a Postgresql service
  # in your workspace.
  #
  # services.postgresql = {
  #   enable = true;
  #   package = pkgs.postgresql_15;
  #   initialDatabases = [
  #     { name = "my-db"; }
  #   ];
  # };
}