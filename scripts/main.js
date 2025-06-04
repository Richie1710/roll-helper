Hooks.once("ready", () => {
    if (!game.user.isGM) return;
  
    game.rollHelper = {
      async secretRoll(skill = "perception") {
        for (const token of canvas.tokens.controlled) {
          const actor = token.actor;
          if (!actor) continue;
  
          let rollFunc;
  
          if (skill === "perception") {
            rollFunc = actor.system.attributes.perception?.roll;
          } else if (["fortitude", "reflex", "will"].includes(skill)) {
            rollFunc = actor.system.saves[skill]?.roll;
          } else {
            rollFunc = actor.system.skills[skill]?.roll;
          }
  
          if (typeof rollFunc !== "function") {
            ui.notifications.warn(`${actor.name} kann keinen geheimen Wurf für '${skill}' machen.`);
            continue;
          }
  
          await rollFunc.call(actor, { secret: true });
        }
      }
    };
  
    console.log("🎲 Secret Roll Helper loaded!");
  });
  