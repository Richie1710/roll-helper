Hooks.once("ready", () => {
    if (!game.user.isGM) return;
  
    game.rollHelper = {
      async secretRoll(skill = "perception") {
        for (const token of canvas.tokens.controlled) {
          const actor = token.actor;
          if (!actor) continue;
  
          let rollMethod;
  
          if (skill === "perception") {
            rollMethod = foundry.utils.getProperty(actor, "system.attributes.perception.roll");
          } else if (["fortitude", "reflex", "will"].includes(skill)) {
            rollMethod = foundry.utils.getProperty(actor, `system.saves.${skill}.roll`);
          } else {
            rollMethod = foundry.utils.getProperty(actor, `system.skills.${skill}.roll`);
          }
  
          if (typeof rollMethod === "function") {
            await rollMethod.call(actor, { secret: true });
          } else {
            console.warn(`⛔ ${actor.name} → Kein gültiger Roll-Handler für '${skill}'`);
            ui.notifications.warn(`${actor.name} kann keinen geheimen Wurf für '${skill}' machen.`);
          }
        }
      }
    };
  
    console.log("🎲 Secret Roll Helper für PF2e geladen.");
  });
  