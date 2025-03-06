export class Player {
  constructor(id, hp, attack, defense, speed, name, description, image, userId, level, spAttack) {
    this.id = id;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.speed = speed;
    this.name = name;
    this.description = description;
    this.image = image;
    this.userId = userId;
    this.level = level;
    this.spAttack = spAttack;
  }

  takeDamage(amount) {
    this.hp = amount > this.hp ? 0 :  this.hp - amount;
    return this.hp > 0;
  }

  attackDamage({opponentDefense, attackPower}) {
    const randomFactor = 0.7 + Math.random() * (1 - 0.7);
    const powerAttackFactor = attackPower < 20 ? 0 : (1 + attackPower / 100)
    const baseDamage = ((2 * this.level / 5 + 2) * this.spAttack * (this.attack / Math.max(opponentDefense, 1))) / 50 + 2;

    return Math.round(baseDamage * powerAttackFactor * randomFactor);
  }

}
