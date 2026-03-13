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

  # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
  idx.extensions = [
    "ms-vscode.vscode-typescript-next"
    "svelte.svelte-vscode"
    "unifiedjs.vscode-mdx"
    "csstools.postcss"
    "Vue.volar"
    "ms-playwright.playwright"
    "esbenp.prettier-vscode"
    "dbaeumer.vscode-eslint"
    "bradlc.vscode-tailwindcss"
    "astro-build.astro-vscode"
    "christian-kohler.path-intellisense"
    "EditorConfig.EditorConfig"
    "formulahendry.auto-close-tag"
    "formulahendry.auto-rename-tag"
    "pranaygp.vscode-css-peek"
    "Zignd.html-css-class-completion"
  ];

  # Workspace lifecycle hooks
  idx.workspace.onCreate = {
    pnpm-install = "pnpm install";
  };

  # Enable previews
  # https://idx.dev/reference/dev-nix
  idx.previews = {
    enable = true;
    previews = [
      {
        command = [
          "pnpm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
        id = "web";
      }
    ];
  };
}