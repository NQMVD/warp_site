default:
    gum log -l "info" "This uses deno to run the application."
    just --list

@install:
    gum log -l "info" "Installing dependencies..."
    deno install

@run:
    gum log -l "info" "Running the application..."
    deno run dev

@build:
    gum log -l "info" "Building the application..."
    deno task build

@update:
    gum log -l "info" "Updating project..."
    git pull
    gum log -l "info" "Building the application..."
    deno task build
