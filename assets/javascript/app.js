$(document).ready(function(){
  
    
    $("#remaining-time").hide();
    $("#start").on('click', game.startGame);
    $(document).on('click' , '.option', game.guessChecker);
    
  })
  
  var game = {
    // variables
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    clock: 20,
    clockOn: false,
    clockId : '',
    // questions with options and answers organized
    questions: {
      q1: 'Who did Jon Snow fight in Battle of the Bastards?',
      q2: 'Which house has the Sigil of a Wolf',
      q3: 'How did Joffrey die?',
      q4: 'What did Sam use to kill a White Walker?',
      q5: "Who knighted Brienne of Tarth?",
      q6: 'What is the name of the city the Lannisters rule over?',
      q7: "Who becomes Queen of the North?"
    },
    options: {
      q1: ['Ramsay Bolton', 'Theon Greyjoy', 'Sandor Clegane', 'The Rock'],
      q2: ['House Tyrell', 'House Bolton', 'House Stark', 'House Lannister'],
      q3: ['Poison', 'Crossbow', 'Stabbed', 'Hung'],
      q4: ['Valyrian Steel', 'Sword', 'Axe', 'Fire'],
      q5: ['Jamie Lannister','Robert Baratheon','Tormund','Ser Davos'],
      q6: ['Kings Landing','Westeros','Essos','Winterfell'],
      q7: ['Daenerys Targaryen', 'Cersei Lannister', 'Sansa Stark','Margaery Tyrell'],
    },
    answers: {
      q1: 'Ramsay Bolton',
      q2: 'House Stark',
      q3: 'Poison',
      q4: 'Valyrian Steel',
      q5: 'Jamie Lannister',
      q6: 'Kings Landing',
      q7: 'Sansa Stark'
    },
   
    startGame: function(){
      
      game.currentSet = 0;
      game.correct = 0;
      game.incorrect = 0;
      game.unanswered = 0;
      clearInterval(game.clockId);
      
      
      $('#game').show();
      
      
      $('#results').html('');
      
      
      $('#timer').text(game.clock);
      
      
      $('#start').hide();
  
      $('#remaining-time').show();
      
      
      game.nextQuestion();
      
    },
    
    nextQuestion : function(){
      
      
      game.clock = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(game.clock);
      
      
      if(!game.clockOn){
        game.clockId = setInterval(game.clockRunning, 1000);
      }
      
      
      var questionContent = Object.values(game.questions)[game.currentSet];
      $('#question').text(questionContent);
      
      
      var questionOptions = Object.values(game.options)[game.currentSet];
      
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    
    clockRunning : function(){
      
      if(game.clock > -1 && game.currentSet < Object.keys(game.questions).length){
        $('#timer').text(game.clock);
        game.clock--;
          if(game.clock === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      
      else if(game.clock === -1){
        game.unanswered++;
        game.result = false;
        clearInterval(game.clockId);
        resultId = setTimeout(game.guessResult, 1000);
        $('#results').html('<h3>out of time! the answer was '+ Object.values(game.answers)[game.currentSet] +'</h3>');
      }
      
      else if(game.currentSet === Object.keys(game.questions).length){
        
        
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ game.correct +'</p>'+
          '<p>Incorrect: '+ game.incorrect +'</p>'+
          '<p>Unaswered: '+ game.unanswered +'</p>'+
          '<p>Play again!</p>');
        
        
        $('#game').hide();
        
        
        $('#start').show();
      }
      
    },
    
    guessChecker : function() {
      
      
      var resultId;
      
      
      var currentAnswer = Object.values(game.answers)[game.currentSet];
      
      
      if($(this).text() === currentAnswer){
        
        $(this).addClass('btn-success').removeClass('btn-info');
        
        game.correct++;
        clearInterval(game.clockId);
        resultId = setTimeout(game.guessResult, 1000);
        $('#results').html('<h3>Correct!</h3>');
      }
      
      else{
        
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        game.incorrect++;
        clearInterval(game.clockId);
        resultId = setTimeout(game.guessResult, 1000);
        $('#results').html('<h3>Wrong! '+ currentAnswer +'</h3>');
      }
      
    },
    
    guessResult : function(){
      
      
      game.currentSet++;
      
      
      $('.option').remove();
      $('#results h3').remove();
      
      
      game.nextQuestion();
       
    }
  
  }