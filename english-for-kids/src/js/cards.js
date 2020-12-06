const cardsArray = [
  {
    word: 'Action',
    translation: '',
    image: "../img/dive.jpg",
    audioSrc: '',
    category: 'categories',
    icon: "../img/action.png",
  },
  {
    word: 'Adjective',
    translation: '',
    image: '../img/cold.jpg',
    audioSrc: '',
    category: 'categories',
    icon: "../img/adjective.png"
  },
  {
    word: 'Animal',
    translation: '',
    image: '../img/cat.jpg',
    audioSrc: '',
    category: 'categories',
    icon: "../img/animal.png"
  },
  {
    word: 'Clothes',
    translation: '',
    image: '../img/skirt.jpg',
    audioSrc: '',
    category: 'categories',
    icon: "../img/clothes.png"
  },
  {
    word: 'Emotions',
    translation: '',
    image: '../img/happy.jpg',
    audioSrc: '',
    category: 'categories',
    icon: "../img/emotions.png"
  },
  {
    word: 'Food',
    translation: '',
    image: '../img/meat.jpg',
    audioSrc: '',
    category: 'categories',
    icon: "../img/food.png"
  },
  {
    word: 'Transport',
    translation: '',
    image: '../img/bicycle.jpg',
    audioSrc: '',
    category: 'categories',
    icon: "../img/transport.png"
  },
  {
    word: 'Profession',
    translation: '',
    image: '../img/farmer.jpg',
    audioSrc: '',
    category: 'categories',
    icon: "../img/profession.png"
  },
  {
    word: 'cry',
    translation: 'плакать',
    image: '../img/cry.jpg',
    audioSrc: '../audio/cry.mp3',
    category: 'Action'
  },
  {
    word: 'dance',
    translation: 'танцевать',
    image: '../img/dance.jpg',
    audioSrc: '../audio/dance.mp3',
    category: 'Action'
  },
  {
    word: 'dive',
    translation: 'нырять',
    image: '../img/dive.jpg',
    audioSrc: '../audio/dive.mp3',
    category: 'Action'
  },
  {
    word: 'draw',
    translation: 'рисовать',
    image: 'img/draw.jpg',
    audioSrc: '../audio/draw.mp3',
    category: 'Action'
  },
  {
    word: 'fish',
    translation: 'ловить рыбу',
    image: '../img/fish.jpg',
    audioSrc: '../audio/fish.mp3',
    category: 'Action'
  },
  {
    word: 'fly',
    translation: 'летать',
    image: '../img/fly.jpg',
    audioSrc: '../audio/fly.mp3',
    category: 'Action'
  },
  {
    word: 'hug',
    translation: 'обнимать',
    image: '../img/hug.jpg',
    audioSrc: '../audio/hug.mp3',
    category: 'Action'
  },
  {
    word: 'jump',
    translation: 'прыгать',
    image: '../img/jump.jpg',
    audioSrc: '../audio/jump.mp3',
    category: 'Action'
  },

  {
    word: 'bitter',
    translation: 'горький',
    image: '../img/bitter.jpg',
    audioSrc: '../audio/bitter.mp3',
    category: 'Adjective'
  },
  {
    word: 'evil',
    translation: 'злой',
    image: '../img/evil.jpg',
    audioSrc: '../audio/evil.mp3',
    category: 'Adjective'
  },
  {
    word: 'hot',
    translation: 'горячий',
    image: '../img/hot.jpg',
    audioSrc: '../audio/hot.mp3',
    category: 'Adjective'
  },
  {
    word: 'cold',
    translation: 'холодный',
    image: '../img/cold.jpg',
    audioSrc: '../audio/cold.mp3',
    category: 'Adjective'
  },
  {
    word: 'solar',
    translation: 'солнечный',
    image: '../img/solar.jpg',
    audioSrc: '../audio/solar.mp3',
    category: 'Adjective'
  },
  {
    word: 'sharp',
    translation: 'острый',
    image: '../img/sharp.jpg',
    audioSrc: '../audio/sharp.mp3',
    category: 'Adjective'
  },
  {
    word: 'modest',
    translation: 'скромный',
    image: '../img/modest.jpg',
    audioSrc: '../audio/modest.mp3',
    category: 'Adjective'
  },
  {
    word: 'friendly',
    translation: 'дружелюбный',
    image: '../img/friendly.jpg',
    audioSrc: '../audio/friendly.mp3',
    category: 'Adjective'
  },

  {
    word: 'cat',
    translation: 'кот',
    image: '../img/cat.jpg',
    audioSrc: '../audio/cat.mp3',
    category: 'Animal'
  },
  {
    word: 'chick',
    translation: 'цыплёнок',
    image: '../img/chick.jpg',
    audioSrc: '../audio/chick.mp3',
    category: 'Animal'
  },
  {
    word: 'jerboa',
    translation: 'тушканчик',
    image: '../img/jerboa.jpg',
    audioSrc: '../audio/jerboa.mp3',
    category: 'Animal'
  },
  {
    word: 'dog',
    translation: 'собака',
    image: '../img/dog.jpg',
    audioSrc: '../audio/dog.mp3',
    category: 'Animal'
  },
  {
    word: 'horse',
    translation: 'лошадь',
    image: '../img/horse.jpg',
    audioSrc: '../audio/horse.mp3',
    category: 'Animal'
  },
  {
    word: 'pig',
    translation: 'свинья',
    image: '../img/pig.jpg',
    audioSrc: '../audio/pig.mp3',
    category: 'Animal'
  },
  {
    word: 'rabbit',
    translation: 'кролик',
    image: '../img/rabbit.jpg',
    audioSrc: '../audio/rabbit.mp3',
    category: 'Animal'
  },
  {
    word: 'sheep',
    translation: 'овца',
    image: '../img/sheep.jpg',
    audioSrc: '../audio/sheep.mp3',
    category: 'Animal'
  },

  {
    word: 'skirt',
    translation: 'юбка',
    image: '../img/skirt.jpg',
    audioSrc: '../audio/skirt.mp3',
    category: 'Clothes'
  },
  {
    word: 'pants',
    translation: 'брюки',
    image: '../img/pants.jpg',
    audioSrc: '../audio/pants.mp3',
    category: 'Clothes'
  },
  {
    word: 'blouse',
    translation: 'блузка',
    image: '../img/blouse.jpg',
    audioSrc: '../audio/blouse.mp3',
    category: 'Clothes'
  },
  {
    word: 'dress',
    translation: 'платье',
    image: '../img/dress.jpg',
    audioSrc: '../audio/dress.mp3',
    category: 'Clothes'
  },
  {
    word: 'boot',
    translation: 'ботинок',
    image: '../img/boot.jpg',
    audioSrc: '../audio/boot.mp3',
    category: 'Clothes'
  },
  {
    word: 'shirt',
    translation: 'рубашка',
    image: '../img/shirt.jpg',
    audioSrc: '../audio/shirt.mp3',
    category: 'Clothes'
  },
  {
    word: 'coat',
    translation: 'пальто',
    image: '../img/coat.jpg',
    audioSrc: '../audio/coat.mp3',
    category: 'Clothes'
  },
  {
    word: 'shoe',
    translation: 'туфли',
    image: '../img/shoe.jpg',
    audioSrc: '../audio/shoe.mp3',
    category: 'Clothes'
  },

  {
    word: 'sad',
    translation: 'грустный',
    image: '../img/sad.jpg',
    audioSrc: '../audio/sad.mp3',
    category: 'Emotions'
  },
  {
    word: 'angry',
    translation: 'сердитый',
    image: '../img/angry.jpg',
    audioSrc: '../audio/angry.mp3',
    category: 'Emotions'
  },
  {
    word: 'happy',
    translation: 'счастливый',
    image: '../img/happy.jpg',
    audioSrc: '../audio/happy.mp3',
    category: 'Emotions'
  },
  {
    word: 'tired',
    translation: 'уставший',
    image: '../img/tired.jpg',
    audioSrc: '../audio/tired.mp3',
    category: 'Emotions'
  },
  {
    word: 'surprised',
    translation: 'удивлённый',
    image: '../img/surprised.jpg',
    audioSrc: '../audio/surprised.mp3',
    category: 'Emotions'
  },
  {
    word: 'scared',
    translation: 'испуганный',
    image: '../img/scared.jpg',
    audioSrc: '../audio/scared.mp3',
    category: 'Emotions'
  },
  {
    word: 'smile',
    translation: 'улыбка',
    image: '../img/smile.jpg',
    audioSrc: '../audio/smile.mp3',
    category: 'Emotions'
  },
  {
    word: 'laugh',
    translation: 'смех',
    image: '../img/laugh.jpg',
    audioSrc: '../audio/laugh.mp3',
    category: 'Emotions'
  },

  {
    word: 'meat',
    translation: 'мясо',
    image: '../img/meat.jpg',
    audioSrc: '../audio/meat.mp3',
    category: 'Food'
  },
  {
    word: 'biscuits',
    translation: 'печенье',
    image: '../img/biscuits.jpg',
    audioSrc: '../audio/biscuits.mp3',
    category: 'Food'
  },
  {
    word: 'soup',
    translation: 'суп',
    image: '../img/soup.jpg',
    audioSrc: '../audio/soup.mp3',
    category: 'Food'
  },
  {
    word: 'chicken',
    translation: 'курица',
    image: '../img/chicken.jpg',
    audioSrc: '../audio/chicken.mp3',
    category: 'Food'
  },
  {
    word: 'trout',
    translation: 'форель',
    image: '../img/trout.jpg',
    audioSrc: '../audio/trout.mp3',
    category: 'Food'
  },
  {
    word: 'bread',
    translation: 'хлеб',
    image: '../img/bread.jpg',
    audioSrc: '../audio/bread.mp3',
    category: 'Food'
  },
  {
    word: 'rice',
    translation: 'рис',
    image: '../img/rice.jpg',
    audioSrc: '../audio/rice.mp3',
    category: 'Food'
  },
  {
    word: 'pasta',
    translation: 'макароны',
    image: '../img/pasta.jpg',
    audioSrc: '../audio/pasta.mp3',
    category: 'Food'
  },

  {
    word: 'bus',
    translation: 'автобус',
    image: '../img/bus.jpg',
    audioSrc: '../audio/bus.mp3',
    category: 'Transport'
  },
  {
    word: 'car',
    translation: 'машина',
    image: '../img/car.jpg',
    audioSrc: '../audio/car.mp3',
    category: 'Transport'
  },
  {
    word: 'bicycle',
    translation: 'велосипед',
    image: '../img/bicycle.jpg',
    audioSrc: '../audio/bicycle.mp3',
    category: 'Transport'
  },
  {
    word: 'airplane',
    translation: 'самолет',
    image: '../img/airplane.jpg',
    audioSrc: '../audio/airplane.mp3',
    category: 'Transport'
  },
  {
    word: 'motorcycle',
    translation: 'мотоцикл',
    image: '../img/motorcycle.jpg',
    audioSrc: '../audio/motorcycle.mp3',
    category: 'Transport'
  },
  {
    word: 'tram',
    translation: 'трамвай',
    image: '../img/tram.jpg',
    audioSrc: '../audio/tram.mp3',
    category: 'Transport'
  },
  {
    word: 'subway',
    translation: 'метро',
    image: '../img/subway.jpg',
    audioSrc: '../audio/subway.mp3',
    category: 'Transport'
  },
  {
    word: 'taxi',
    translation: 'такси',
    image: '../img/taxi.jpg',
    audioSrc: '../audio/taxi.mp3',
    category: 'Transport'
  },
  {
    word: 'doctor',
    translation: 'врач',
    image: '../img/doctor.jpg',
    audioSrc: '../audio/doctor.mp3',
    category: 'Profession'
  },
  {
    word: 'policeman',
    translation: 'полицейский',
    image: '../img/policeman.jpg',
    audioSrc: '../audio/policeman.mp3',
    category: 'Profession'
  },
  {
    word: 'teacher',
    translation: 'учитель',
    image: '../img/teacher.jpg',
    audioSrc: '../audio/teacher.mp3',
    category: 'Profession'
  },
  {
    word: 'builder',
    translation: 'строитель',
    image: '../img/builder.jpg',
    audioSrc: '../audio/builder.mp3',
    category: 'Profession'
  },
  {
    word: 'electrician',
    translation: 'электрик',
    image: '../img/electrician.jpg',
    audioSrc: '../audio/electrician.mp3',
    category: 'Profession'
  },
  {
    word: 'farmer',
    translation: 'фермер',
    image: '../img/farmer.jpg',
    audioSrc: '../audio/farmer.mp3',
    category: 'Profession'
  },
  {
    word: 'firefighter',
    translation: 'пожарный',
    image: '../img/firefighter.jpg',
    audioSrc: '../audio/firefighter.mp3',
    category: 'Profession'
  },
  {
    word: 'seller',
    translation: 'продавец',
    image: '../img/seller.jpg',
    audioSrc: '../audio/seller.mp3',
    category: 'Profession'
  }
]

export default cardsArray;