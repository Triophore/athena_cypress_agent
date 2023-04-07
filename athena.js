#!/usr/bin/env node
var figlet = require('figlet');
const prompts = require('prompts');
const fs = require("fs");
const path = require("path");
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const saveFile = require('fs').writeFileSync;
async function start() {



    // console.log(start_script)
    // process.exit(0)

    console.log(figlet.textSync('Athena', {
        // font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }));

    if (argv.command == 'fixture') {
        var proj_path = process.cwd();
        var full_path = path.join(proj_path, "fixtures.json");

        let Files = [];

        function ThroughDirectory(Directory) {
            fs.readdirSync(Directory).forEach(File => {
                const Absolute = path.join(Directory, File);
                if (fs.statSync(Absolute).isDirectory()) return ThroughDirectory(Absolute);
                else return Files.push(Absolute);
            });
        }

        ThroughDirectory(path.join(proj_path,"./cypress/e2e/"));


        var final_fixture = [];

        for (var d = 0; d < Files.length; d++) {
            var o = {

            }
            o[Files[d]] = "";
            final_fixture.push(o);
        }

        fs.writeFileSync(full_path , JSON.stringify(final_fixture, null, 2));

        console.log("fixture and spec mapping file created ...");
        console.log(" ")
        console.log("bye...");
        process.exit(0);
    }

    console.log("Project helper cli")

    var project_id = await getProjectId();

    checkData(project_id);

    const r2accountid = await prompts({
        type: 'text',
        name: 'value',
        message: 'Please provide s3 or R2 Account ID',
        //validate: value => value < 18 ? `Nightclub is 18+ only` : true
    });

    checkData(r2accountid);

    const r2accountkeyid = await prompts({
        type: 'text',
        name: 'value',
        message: 'Please provide s3 or R2 Key ID',
        //validate: value => value < 18 ? `Nightclub is 18+ only` : true
    });

    checkData(r2accountkeyid);

    const r2secret = await prompts({
        type: 'text',
        name: 'value',
        message: 'Please provide s3 or R2 Secret ID',
        //validate: value => value < 18 ? `Nightclub is 18+ only` : true
    });

    checkData(r2secret);

    const agnet_config = await prompts({
        type: 'text',
        name: 'value',
        message: 'Please paste the agent config json',
        //validate: value => value < 18 ? `Nightclub is 18+ only` : true
    });

    checkData(agnet_config);

    var agent_json = null;

    try {
        agent_json = JSON.parse(agnet_config.value);
    } catch (error) {
        console.log("Error Agent Config is not valid json");
        process.exit(0);
    }

    if (agent_json == null) {
        console.log("Error Agent Config is not valid json");
        process.exit(0);
    }

    var proj_path = process.cwd();

    var full_path = path.join(proj_path, "package.json");

    if (!fs.existsSync(full_path)) {
        console.log("Error PackageJSON not found");
        process.exit(0);
    }


    const pkgJsonPath = require.main.paths[0].split('node_modules')[0] + 'package.json';

    const json = require(pkgJsonPath);

    if (!json.hasOwnProperty('scripts')) {
        json.scripts = {};
    }

    var agent = {
        project_id: project_id.value,
        r2accountid: r2accountid.value,
        r2accountkeyid: r2accountkeyid.value,
        r2secret: r2secret.value,
        ...agent_json
    }

    json.scripts['start'] = 'node start.js';
    json["agent_cypress"] = agent

    saveFile(pkgJsonPath, JSON.stringify(json, null, 2));

    var start_script = fs.readFileSync("node_modules/athena_cypress_agent/start.txt");

    fs.writeFileSync(path.join(proj_path, "start.js"), start_script);

    console.log("")
    console.log("")
    console.log("")

    console.log("Agent details added to package.json file");

    console.log("")
    console.log("")

    console.log("Next step.")

    console.log("")
    console.log("")

    console.log("Open cypress.config.js")

    console.log("")
    console.log("")

    console.log("Paste inside  'e2e' key , the following snippet")

    console.log("")
    console.log("")

    console.log(`
    
    setupNodeEvents(on, config) {
        require("athena_cypress_agent").plugin(on,require("./package.json"))
    },
    
    `);

    console.log("")
    console.log("")

    console.log("please run 'npm run start' to start agent and cypress")

    console.log("")
    console.log("")

    console.log("Bye")


}


async function getProjectId() {

    const project_id = await prompts({
        type: 'text',
        name: 'value',
        message: 'Please provide project id',
        //validate: value => value < 18 ? `Nightclub is 18+ only` : true
    });

    return project_id;

}

function checkData(data) {
    if (Object.keys(data).length == 0) {
        console.error("Invalid Value please rerun the CLI");
        console.error("bye ..")
        process.exit(0)
    } else {
        if (data.value == '') {
            console.error("Invalid Value please rerun the CLI");
            console.error("bye ..")
            process.exit(0)
        }
    }
}

start();