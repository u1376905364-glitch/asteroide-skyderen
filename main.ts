cene.setBackgroundColor(15)
info.setScore(0)
info.setLife(3)

let ship = sprites.create(img`
    . . . 5 5 . . .
    . . . 5 5 . . .
    . . 8 8 8 8 . .
    . 8 8 8 8 8 8 .
    8 8 8 8 8 8 8 8
    8 8 . 8 8 . 8 8
    game.onUpdate(function() {
        
    })
    8 . . 2 2 . . 8
    . . . 2 2 . . .
`, SpriteKind.Player)
ship.setPosition(80, 105)
ship.setStayInScreen(true)
controller.moveSprite(ship, 100, 100)

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let laser = sprites.createProjectileFromSprite(img`
        5 5
        5 5
        2 2
        2 2
    `, ship, 0, -120)
})

game.onUpdateInterval(700, function () {
    let asteroid = sprites.create(img`
        . . c c c c . .
        . c e e e e c .
        c e e d e e e c
        c e d e e e e c
        c e e e e d e c
        c e e e d e e c
        . c e e e e c .
        . . c c c c . .
    `, SpriteKind.Enemy)
    asteroid.setPosition(randint(8, 152), 0)
    asteroid.vy = randint(30, 60) + info.score() * 2
    asteroid.setFlag(SpriteFlag.AutoDestroy, true)
})

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite, effects.fire, 150)
    info.changeScoreBy(1)
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 150)
    info.changeLifeBy(-1)
})