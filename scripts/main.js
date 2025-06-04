Hooks.once("ready", () => {
    if (!game.user.isGM) return;
  
    game.rollHelper = {
      async secretRoll(skill = "perception") {
        for (const token of canvas.tokens.controlled) {
          const actor = token.actor;
          if (!actor) continue;
  
          try {
            if (skill === "perception") {
              await actor.rollPerception({ secret: true });
            } else if (["fortitude", "reflex", "will"].includes(skill)) {
              await actor.rollSave(skill, { secret: true });
            } else {
              await actor.rollSkill(skill, { secret: true });
            }
          } catch (err) {
            ui.notifications.warn(`${actor.name} kann keinen geheimen Wurf für '${skill}' machen.`);
          }
        }
      }
    };
  
    console.log("🎲 Secret Roll Helper fully loaded!");
  });
  