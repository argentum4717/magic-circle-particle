import { world, MolangVariableMap, system } from "@minecraft/server";

function spawnMagicCircle(player, angle, angle2) {
	const degToRad = Math.PI/180;
	const radAngle = angle * degToRad;
	const radAngle2 = angle2 * degToRad;
	
	let location = null;
	let radius = 1;
	
	const map = new MolangVariableMap();
	map.setFloat("variable.angle", angle - 90);
	map.setFloat("variable.angle2", angle2);
	
	for(let i=1; i<=4; i++) {
		radius += 0.1;
		
		location = player.getHeadLocation();
		location.x += radius * Math.cos(radAngle) * Math.cos(radAngle2);
		location.y += radius * Math.sin(radAngle);
		location.z += radius * Math.cos(radAngle) * Math.sin(radAngle2);
		
		if(i === 1) {
			player.dimension.spawnParticle("test:magic_circle", location, map);
		} else {
			player.dimension.spawnParticle("test:magic_circle"+i, location, map);
        }
	}
}

world.afterEvents.itemUse.subscribe(event => {
	const { source, itemStack } = event;
	
	if(itemStack.typeId === "minecraft:blaze_rod") {
		const angle = source.getRotation().x * -1;
		const angle2 = source.getRotation().y + 90;
		
		spawnMagicCircle(source, angle, angle2);
	}
});