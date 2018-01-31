window.addEventListener('load', function(){

	Array.prototype.shuffle = function() {
		var input = this;
			 
		for (var i = input.length-1; i >=0; i--) {
			 
			var randomIndex = Math.floor(Math.random()*(i+1)); 
			var itemAtIndex = input[randomIndex]; 
				 
			input[randomIndex] = input[i]; 
			input[i] = itemAtIndex;
		}
		return input;
	}
	
	window.app = new Vue({
		el: '#app',
		data: {
			generatedInt: 	{
								i1: null,
								i2: null
							}, 	
			options:    	Array(9).fill(null), 
			mode: 			'multiplication'
		},
		created() {
			this.generateQuestion();
		},
		computed: {
			operationString() {
				switch(this.mode) {
					case 'multiplication': return 'x';
					break;
					case 'addition': return '+';
					break;
					case 'subtraction': return '-';
					break;
				}
			}
		},
		methods: {
			generateClass(mode) {
				if(mode == this.mode){
					return 'modeButton selected';
				}else{
					return 'modeButton';
				}
			},

			changeMode(mode) {
				switch(mode) {
					case 'multiplication': 
						this.mode = 'multiplication';
					break;
					case 'addition': 
						this.mode = 'addition';
					break;
					case 'subtraction': 
						this.mode = 'subtraction';
					break;
				}

				this.generateQuestion();
			},

			generateInt() {
				return Math.floor(Math.random()*10 + 1);
			},

			generateQuestion() {
				var i1 = this.generateInt();
				var i2 = this.generateInt();

				var rightAnswer = this.generateRightAnswer(i1, i2, this.mode);

				this.generatedInt = {
					i1: i1,
					i2: i2
				};

				this.rightAnswer = rightAnswer;

				this.generateOptionArray(rightAnswer);
			},

			generateRightAnswer(i1, i2, mode) {
				switch(mode) {
					case 'multiplication': return i1 * i2;
					break;
					case 'addition': return i1 + i2;
					break;
					case 'subtraction': return i1 - i2;
					break;
				}

				return false;
			},

			generateQuestionString() {
				var qString = this.generatedInt.i1 + this.operationString + this.generatedInt.i2 + " = ?";
				return qString;
			},

			generateOptionArray(rA) {
				var _array = [];
				_array.push(rA);

				while (_array.length < 9) {
					var _i1 = this.generateInt(), _i2 = this.generateInt();
					_alternateOption = this.generateRightAnswer(_i1, _i2, this.mode);
					if(_array.indexOf(_alternateOption) > -1) {
						continue;
					}
					_array.push(_alternateOption);
				}

				_array.shuffle();
				this.options = _array;
			},

			reset(){
				this.generateInt = 	{ i1: null, i2: null }
				this.rightAnswer = 	null;
				this.answer = 		null;	
				this.options = 		Array(9).fill(null), 
				this.mode = 		'multiplication'
			},

			select(option){
				if(option == this.rightAnswer){
					// alert("Doğru Bildin!");
					this.generateQuestion();
				}else{
					alert("Yanlış Cevap! Tekrar Dene!");
				}
			},

		},
		beforeDestroy() {}
	});
});