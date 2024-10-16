# TFT Handbook

This is a revamp of the [TFT Handbook](https://tfthandbook.com/) by RobinSongz.
It makes it nicer looking and easier to navigate in game.

Website: [**tfthandbook.vercel.app**](https://tfthandbook.vercel.app)

## Setup

Install Bun.

```bash
# install dependencies
bun install

# run app locally
bun dev  # spins up at localhost:3000

# run script to fetch latest handbook & store in redis
bun run cli/fetch-handbook.ts
```

Since it uses Vercel's storage feature, to actually run it (even locally) you'll
need to fork the repo, set up a Vercel project and pull `.env.development.local`
using the Vercel CLI. (I doubt anyone's actually going to do this; message me if
you actually want more detailed instructions.)

## Screenshots

![](screenshots/screenshot1.png)

![](screenshots/screenshot2.png)

![](screenshots/screenshot3.png)
