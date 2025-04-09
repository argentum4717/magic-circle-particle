import { world, MolangVariableMap, system } from "@minecraft/server";

//파타클 생성 함수
function spawnMagicCircle(player, rawAngle, angle2) {
	let angle = null;
	
	if(rawAngle >= 0 && rawAngle <= 2) {
		angle = 3;
	} else if(rawAngle >= -2 && rawAngle <= -1) {
		angle = -3;
	} else {
		angle = rawAngle;
	}

	const degToRad = Math.PI/180;
	const radAngle = rawAngle * degToRad;
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

//아이템 사용 시 파티클 소환하는 코드
world.afterEvents.itemUse.subscribe(event => {
	const { source, itemStack } = event;
	
	if(itemStack.typeId === "minecraft:blaze_rod") {
		const angle = source.getRotation().x * -1;
		const angle2 = source.getRotation().y + 90;
		
		spawnMagicCircle(source, angle, angle2);
	}
});
