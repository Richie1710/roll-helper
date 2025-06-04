Hooks.once("ready", () => {
    if (!game.user.isGM) return;
  
    game.rollHelper = {
      async secretRoll(skill = "perception") {
        for (const token of canvas.tokens.controlled) {
          const actor = token.actor;
          if (!actor) continue;
  
          const rollData = actor.system.skills?.[skill] ?? actor.system?.[skill];
          if (!rollData || !rollData.roll) {
            ui.notifications.warn(`${actor.name} kann keinen geheimen Wurf für '${skill}' machen.`);
            continue;
          }
  
          await rollData.roll({ secret: true });
        }
      }
    };
  
    console.log("🎲 Secret Roll Helper loaded!");
  });
  