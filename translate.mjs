import OpenAI from "openai";
const openai = new OpenAI();

export const getReferenceTable = async (name) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system", content: `
                List all key concepts, characters, and terminology for the show 
                "${name}"
                with the official/most relevant translation to pt-BR
            ` },
            {
                role: "user",
                content: name,
            },
        ],
    });
    console.log(`Prompt: ${completion.choices[0].message.content}`)
    return completion.choices[0].message.content
}

export const translateSync = async (context, srt) => {
    console.log(srt)
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system", content: `
                Translate the following lines to pt-BR
                This is part of a subtitle for a movie/show called "${context.name}"
                use everything you know about the original source to translate the subtitle

                Use this translation guide to ensure consistency:
                ${context.guide}

                **Translation Instructions:**

                1. Maintain the tone and context of the original dialogue.
                2. Use terminology that resonates with the existing Brazilian audience familiar with the series.
                3. Ensure that the translation is fluid, capturing the essence of the characters' emotions and motivations.
                4. Adapt cultural references appropriately for a Brazilian audience without losing the original meaning.

                ${context.previous ? `Previous subtitle: ${context.previous}` : ''}

                Answer only the translation.
                `
            },
            {
                role: "user",
                content: srt,
            },
        ],
    });
    console.log(`Result: ${completion.choices[0].message.content}`)
    return completion.choices[0].message.content
}