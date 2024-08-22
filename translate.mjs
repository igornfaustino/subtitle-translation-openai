import OpenAI from "openai";
const openai = new OpenAI();

export const translateSync = async (name, srt) => {
    console.log(srt)
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system", content: `
                Translate the following lines to pt-BR
                This is part of a subtitle for a movie/show called "${name}"
                use everything you know about the original source to translate the subtitle
                Answer only the translation.
            ` },
            {
                role: "user",
                content: srt,
            },
        ],
    });
    console.log(`Result: ${completion.choices[0].message.content}`)
    return completion.choices[0].message.content
}