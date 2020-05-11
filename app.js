new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning : false,
        turns : []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack : function(){
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                'isPlayer' : true,
                'text' : 'Player Hits monster for '+damage
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttack();
        },
        specialAttack : function(){
            var damage = this.calculateDamage(7, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                'isPlayer' : true,
                'text' : 'Player Hits hard monster for '+damage
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttack();
        },
        heal : function(){
            if(this.playerHealth <=90){
                this.playerHealth +=10;
            }
            else{
                this.playerHealth = 100;
            }
            this.turns.unshift({
                'isPlayer' : true,
                'text' : 'Player heals for '+ 10
            });
            this.monsterAttack();
        },
        giveUp : function(){
            this.gameIsRunning = false;
            this.turns = [];
            return;
        },
        calculateDamage : function(min , max) {
            return Math.max(Math.floor(Math.random() * max) +1 , min);
        },
        checkWin : function(){
            if(this.monsterHealth <= 0){
                if(confirm("You Won ! Want to continue ?")){
                    gameIsRunning=  false;
                    this.startGame();
                    
                }
                else {
                    this.gameIsRunning = false;
                    alert("You won!");
                    
                }
                return true;   
            }
            else if(this.playerHealth <=0){
                alert('You Lost!');
                this.gameIsRunning = false;
                return true;
            }
            return false;
        },
        monsterAttack : function(){
            var damage = this.calculateDamage(5,12);
            this.playerHealth -= damage;
            this.turns.unshift({
                'isPlayer' : false,
                'text' : 'Monster Hits player for '+ damage
            });
            this.checkWin(); 

        }
    }
});