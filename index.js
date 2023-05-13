#!/usr/bin/env node

const { Command } = require("commander");
const inquirer = require("inquirer");
const gameStory = require("./dragon-game-story.json");

const play = (sceneId) => {
  const scene = gameStory.scenes[sceneId];
  const message = scene.description;
  const choices = scene.choices.map((item) => item.option);
  inquirer
    .prompt([
      {
        type: "list",
        message,
        name: sceneId,
        choices,
      },
    ])
    .then((answers) => {
      if (!choices.length) {
        console.log("You Won");
      } else {
        play(
          scene.choices.find((item) => item.option === answers[sceneId])
            .nextScene
        );
      }
    });
};

const program = new Command();
program
  .command("start")
  .description("Start the command-line RPG game")
  .action(() => {
    play("start");
  });

program.parse(process.argv);
