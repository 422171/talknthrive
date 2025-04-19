
import React from 'react';

// Larger word bank (60 words - enough for 6 days of rotation)
const wordBank = [
  // Day 1
  { english: "Happy", telugu: "సంతోషంగా" },
  { english: "Fast", telugu: "వేగంగా" },
  { english: "Cold", telugu: "చల్లగా" },
  { english: "Big", telugu: "పెద్దది" },
  { english: "Small", telugu: "చిన్నది" },
  { english: "Clean", telugu: "శుభ్రంగా" },
  { english: "Funny", telugu: "నవ్వించేది" },
  { english: "Kind", telugu: "దయగల" },
  { english: "Nice", telugu: "మంచిది" },
  { english: "Smart", telugu: "తెలివైన" },
  
  // Day 2
  { english: "Beautiful", telugu: "అందమైన" },
  { english: "Brave", telugu: "ధైర్యసంపన్నుడు" },
  { english: "Bright", telugu: "ప్రకాశవంతమైన" },
  { english: "Calm", telugu: "శాంతమైన" },
  { english: "Careful", telugu: "జాగ్రత్తగల" },
  { english: "Clever", telugu: "తెలివైన" },
  { english: "Delicious", telugu: "రుచికరమైన" },
  { english: "Eager", telugu: "ఆసక్తిగల" },
  { english: "Famous", telugu: "ప్రసిద్ధ" },
  { english: "Friendly", telugu: "స్నేహపూర్వక" },
  
  // Day 3
  { english: "Gentle", telugu: "సున్నితమైన" },
  { english: "Glorious", telugu: "ప్రశస్తమైన" },
  { english: "Good", telugu: "మంచి" },
  { english: "Graceful", telugu: "మనోజ్ఞమైన" },
  { english: "Helpful", telugu: "సహాయకారి" },
  { english: "Honest", telugu: "నిజాయితీగల" },
  { english: "Important", telugu: "ముఖ్యమైన" },
  { english: "Joyful", telugu: "ఆనందదాయక" },
  { english: "Lucky", telugu: "అదృష్టవంతుడు" },
  { english: "Neat", telugu: "చక్కగా" },
  
  // Day 4
  { english: "Perfect", telugu: "పరిపూర్ణ" },
  { english: "Pleasant", telugu: "ఆహ్లాదకరమైన" },
  { english: "Powerful", telugu: "శక్తివంతమైన" },
  { english: "Precious", telugu: "విలువైన" },
  { english: "Proud", telugu: "గర్వంతో" },
  { english: "Quick", telugu: "త్వరిత" },
  { english: "Quiet", telugu: "నిశ్శబ్దంగా" },
  { english: "Rich", telugu: "సంపన్న" },
  { english: "Safe", telugu: "సురక్షిత" },
  { english: "Smooth", telugu: "మృదువైన" },
  
  // Day 5
  { english: "Strong", telugu: "బలమైన" },
  { english: "Sweet", telugu: "తీపి" },
  { english: "Talented", telugu: "ప్రతిభావంతుడు" },
  { english: "Thankful", telugu: "కృతజ్ఞతతో" },
  { english: "Thoughtful", telugu: "ఆలోచనాత్మక" },
  { english: "Victorious", telugu: "విజయవంతమైన" },
  { english: "Warm", telugu: "ఉష్ణమైన" },
  { english: "Wise", telugu: "జ్ఞానవంతుడు" },
  { english: "Wonderful", telugu: "అద్భుతమైన" },
  { english: "Worried", telugu: "ఆందోళన" },
  
  // Day 6
  { english: "Active", telugu: "క్రియాశీలక" },
  { english: "Angry", telugu: "కోపంగా" },
  { english: "Bad", telugu: "చెడు" },
  { english: "Boring", telugu: "బోరింగ్" },
  { english: "Careless", telugu: "జాగ్రత్తలేని" },
  { english: "Dangerous", telugu: "ప్రమాదకరమైన" },
  { english: "Dark", telugu: "చీకటి" },
  { english: "Difficult", telugu: "కష్టం" },
  { english: "Dirty", telugu: "అశుభ్రంగా" },
  { english: "Dry", telugu: "ఎండిన" }
];

// Function to get today's words based on date
const getTodaysWords = () => {
  // Get a consistent day index (0-5) based on the current date
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const dayIndex = dayOfYear % 6; // 6 days of rotation
  
  // Return 10 words for today
  return wordBank.slice(dayIndex * 10, (dayIndex * 10) + 10);
};

const speakWord = (word) => {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
};

const speakTeluguWord = async (word) => {
  try {
    const apiKey = 'AIzaSyC-37HcTTt5RW6oDP_f7e8X3S8TBkrKdKM';

    const response = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize?key=' + apiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: { text: word },
        voice: { languageCode: 'te-IN', ssmlGender: 'FEMALE' },
        audioConfig: { audioEncoding: 'MP3' }
      }),
    });

    const data = await response.json();

    if (data.audioContent) {
      const audio = new Audio('data:audio/mp3;base64,' + data.audioContent);
      audio.play();
    } else {
      console.error('Error with speech synthesis:', data);
    }
  } catch (err) {
    console.error('Error in Google Text-to-Speech API:', err);
  }
};

const Dashboard = () => {
  const todaysWords = getTodaysWords();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto card bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
          <span className="border-b-4 border-blue-500 pb-2" style={{display:"flex",color:"#575959",position:"relative",left:"40%",margin:"20px"}}>Words of the Day</span>
        </h1>
        
        <ul className="space-y-6 divide-y divide-gray-200">
          {todaysWords.map((word, idx) => (
            <li key={idx} className="word-item pt-4 pb-6 px-2 rounded-lg hover:bg-blue-50">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-800">{word.english}</span>
                <button style={{position:"relative",left:"10%"}}
                  onClick={() => speakWord(word.english)}
                  className="btn-animate bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  🔊 (EN)
                </button>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-medium text-green-700" style={{position:"relative",right:"10%"}}>{word.telugu}</span>
                <button 
                  onClick={() => speakTeluguWord(word.telugu)}
                  className="btn-animate bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  🔊 (TE)
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;