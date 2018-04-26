import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz'
import Result from './components/Result'
import update from 'react-addons-update';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
     counter: 0,
     questionId: 1,
     question: '',
     answerOptions: [],
     answer: '',
     answersCount: {
       'Leslie Knope': 0,
       'Ron Swanson': 0,
       'Ben Wyatt': 0,
       'Tom Haverford': 0,
       'Andy Dwyer': 0,
       'April Ludgate Dwyer': 0,
       'Chris Trager': 0,
       'Ann Perkins': 0,
       'Donna Meagle': 0


     },
     result: '',
     answerImages:[
       {result: 'Leslie Knope',
        url : 'https://blog-cdn.classy.org/blog/wp-content/uploads/2016/09/15153100/blog_leslie-knope_header.jpg'},
       {result: 'Ron Swanson',
       url: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/ron-swanson-memes/large/memes-rs-milk.jpg?1384968217'},
       {result : 'Ben Wyatt',
       url :'https://i.imgflip.com/wucxy.jpg'},
       {result : 'Tom Haverford',
       url : 'http://www.lolbrary.com/wp-content/uploads/2017/08/tom-haverford.jpg'},
       {result:'Andy Dwyer',
       url: 'https://images7.memedroid.com/images/UPLOADED162/56370df0568b9.jpeg'},
       {result:'April Ludgate Dwyer',
       url: 'https://img.buzzfeed.com/buzzfeed-static/static/enhanced/webdr06/2013/6/26/18/enhanced-buzz-3168-1372287408-6.jpg?downsize=715:*&output-format=auto&output-quality=auto'},
       {result:'Chris Trager',
       url:"https://i.pinimg.com/736x/06/c4/95/06c49537bf7755f11988e2df8d4c5053--chris-traeger-chris-delia.jpg"},
       {result:'Ann Perkins',
       url:'https://img.buzzfeed.com/buzzfeed-static/static/2016-07/13/4/campaign_images/buzzfeed-prod-fastlane03/19-times-ann-perkins-was-the-funniest-character-o-2-3305-1468399555-2_dblbig.jpg'},
       {result:'Donna Meagle',
       url: 'https://memegenerator.net/img/instances/500x/74351799/reply-all-one-more-time-see-what-happens.jpg'}
     ]
     ,
     resultImage: ''
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }



  componentWillMount() {
    const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));

    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  shuffleArray(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;


      while (0 !== currentIndex) {


        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;


        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    };

    handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.questionId < quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
    } else {
        setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer) {
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: {$apply: (currentValue) => currentValue + 1}
    });

    this.setState({
        answersCount: updatedAnswersCount,
        answer: answer
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
        counter: counter,
        questionId: questionId,
        question: quizQuestions[counter].question,
        answerOptions: quizQuestions[counter].answers,
        answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {

    if (result.length === 1 ) {

      this.setState({
        result: result[0]
      })
      console.log(result);
      this.setResultImage();
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  setResultImage(){
    const answerImages = this.state.answerImages;
    const result = this.state.result;
    const answerImagesResult = answerImages.filter((key) => key.result === result)


    this.setState({
      resultImage: answerImagesResult[0].url
    })
  }






  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (
      <Result quizResult={this.state.result} quizResultImage={this.state.resultImage} />
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Quiz</h2>
        </header>
        {this.state.result ? this.renderResult() : this.renderQuiz()}

      </div>
    );
  }
}

export default App;
