## Setup

- Create a `.env` file base on `example.env`
- Replace the `YOUR_API_KEY` with your own api key from openai

## How to run

- Place your subtitle inside the test_files folder with the name `sub.srt`
- Run `node --env-file=.env process-srt.mjs`

File output will be inside a folder called `out`
