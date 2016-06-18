module ShanghaiScooter.State {
  export class Menu extends Phaser.State {
    title:Phaser.Text;
    instructions:Phaser.Text;
    init() {
      this.stage.backgroundColor = 0x000000;
    }

    create() {

      let style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
      this.title = this.game.add.text(this.game.width/2, this.game.height/2, 'Shanghai Scooter',style);
      this.title.anchor.setTo(0.5);
      this.instructions = this.game.add.text(this.game.width/2, this.game.height/2 + 30, 'Tap to play',style);
      this.instructions.anchor.setTo(0.5);
      this.input.onDown.addOnce(() => {
        this.game.state.start('main');
      });
    }
  }
}