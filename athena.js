#!/usr/bin/env node
var figlet = require('figlet');
const prompts = require('prompts');
async function start() {


    console.log(figlet.textSync('Athena', {
        // font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }));

    console.log("Project helper cli")

    const project_id = await prompts({
        type: 'text',
        name: 'value',
        message: 'Please provide project id',
        //validate: value => value < 18 ? `Nightclub is 18+ only` : true
    });

    const r2accountid = await prompts({
        type: 'text',
        name: 'value',
        message: 'Please provide s3 or R2 Account ID',
        //validate: value => value < 18 ? `Nightclub is 18+ only` : true
    });

    const r2accountkeyid = await prompts({
        type: 'text',
        name: 'value',
        message: 'Please provide s3 or R2 Key ID',
        //validate: value => value < 18 ? `Nightclub is 18+ only` : true
    });

    const r2secret = await prompts({
        type: 'text',
        name: 'value',
        message: 'Please provide s3 or R2 Secret ID',
        //validate: value => value < 18 ? `Nightclub is 18+ only` : true
    });

    const agnet_config = await prompts({
        type: 'text',
        name: 'value',
        message: 'Please paste the agent config json',
        //validate: value => value < 18 ? `Nightclub is 18+ only` : true
    });

    console.log(response);

    console.log( process.cwd())

}

start();