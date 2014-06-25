({
    block: 'page',
    title: 'Twitjeet!',
    styles: [{ elem: 'css', url: '_index.css' }],
    scripts: [{ elem: 'js', url: '_index.js' }],
    content: [
        {
            block: 'twitjeet',
            content: [
                {
                    elem: 'form',
                    content: [
                        {
                            block: 'input',
                            mods: { theme: 'normal', size: 'xl' },
                            name: 'query'
                        },
                        {
                            block: 'button',
                            mods: { theme: 'normal', size: 'xl' },
                            type: 'submit',
                            text: 'submit'
                        }
                    ]
                },
                {
                    elem: 'content'
                }
            ]
        }
    ]
})