## Development

The pack uses [packwiz](https://packwiz.infra.link) for managing mods and configurations.

To set up a development environment, follow these steps:

1. Import [Better Than Employment.zip](./Better%20Than%20Employment.zip) into a MultiMC-derived launcher, like [Prism](https://prismlauncher.org).
2. Run the development server with `./packwiz serve`
3. Launch the instance.

You can now make changes to the packwiz configuration and relaunch the game to see the changes.
When editing things like kubejs scripts or mod configs using a GUI, do so in your instance directly and then copy the changes back to the repo when you're done.
You may want to stop the development server while doing this to avoid unwanted conflicts/overwrites.
