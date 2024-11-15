//TODO: FIX TABLE RESET
//TODO: FIX TABLE CREATION
//TODO: FIX TABLE FORMATTING
//TODO: GATHER BASEBALL REF SCREENSHOTS
//TODO: FIGURE OUT DATABASE STRUCTURE
//TODO: FIGURE OUT DATABASE HOSTING SOLUTION

const categories = document.querySelector("#categories");
const question = document.querySelector("#question");
const quizName = document.querySelector("#quiz-name");
const playerStatus = document.querySelector("#player-status");
const answerForm = document.querySelector("#answer-form");
const answerTextbox = document.querySelector("#answer-textbox");
const submitButton = document.querySelector("#submit-button");
const feedback = document.querySelector("#feedback-text");
const mlb = document.querySelector("#MLB");
const nba = document.querySelector("#NBA");
const ncaa = document.querySelector("#NCAA");
const tv = document.querySelector("#TV");
const table = document.querySelector("#answers-table");
const tableHeader = document.querySelector("#table-header");
const tableBody = document.querySelector("#table-body");
const imageCarousel = document.querySelector("#image-carousel");
let selectedCategory = "";
const timer = 300;
const correctAnswers = 0;
const possibleAnswers = 0;
const quizList = document.querySelector("#quiz-list");
let answerBank = [];
let slideIndex = 1;
let currentQuiz = '';
let giveUp = false;

// let MLBQuizzes = [
//     {
//         name: "Triple Crown Batters",
//         headings: ["Year", "Name"],
//         answers: [
//             {
//                 name: "Miguel Cabrera",
//                 year: 2012
//             },
//             {
//                 name: "Carl Yastrzemski",
//                 year: 1967
//             },
//             {
//                 name: "Frank Robinson",
//                 year: 1966
//             },
//             {
//                 name: "Mickey Mantle",
//                 year: 1956
//             },
//             {
//                 name: "Ted Williams",
//                 year: 1947
//             },
//             {
//                 name: "Ted Williams",
//                 year: 1942
//             },
//             {
//                 name: "Joe Medwick",
//                 year: 1937
//             },
//             {
//                 name: "Lou Gehrig",
//                 year: 1934
//             },
//             {
//                 name: "Jimmie Foxx",
//                 year: 1933
//             },
//             {
//                 name: "Chuck Klein",
//                 year: 1933
//             },
//             {
//                 name: "Rogers Hornsby",
//                 year: 1925
//             },
//             {
//                 name: "Rogers Hornsby",
//                 year: 1922
//             },
//             {
//                 name: "Heinie Zimmerman",
//                 year: 1912
//             },
//             {
//                 name: "Ty Cobb",
//                 year: 1909
//             },
//             {
//                 name: "Nap Lajoie",
//                 year: 1901
//             },
//             {
//                 name: "Paul Hines",
//                 year: 1878
//             }
//         ]
//     },
//     {
//         name: "Triple Crown Pitchers",
//         headings: ["Year", "Name"],
//         answers: [
//             {
//                 name: "Tarik Skubal",
//                 year: 2024
//             },
//             {
//                 name: "Chris Sale",
//                 year: 2024
//             },
//             {
//                 name: "Shane Bieber",
//                 year: 2020
//             },
//             {
//                 name: "Justin Verlander",
//                 year: 2011
//             },
//             {
//                 name: "Clayton Kershaw",
//                 year: 2011
//             },
//             {
//                 name: "Jake Peavy",
//                 year: 2007
//             },
//             {
//                 name: "Johan Santana",
//                 year: 2006
//             },
//             {
//                 name: "Randy Johnson",
//                 year: 2002
//             },
//             {
//                 name: "Pedro Martinez",
//                 year: 1999
//             },
//             {
//                 name: "Roger Clemens",
//                 year: 1998
//             },
//             {
//                 name: "Roger Clemens",
//                 year: 1997
//             },
//             {
//                 name: "Dwight Gooden",
//                 year: 1985
//             },
//             {
//                 name: "Steve Carlton",
//                 year: 1972
//             },
//             {
//                 name: "Sandy Koufax",
//                 year: 1966
//             },
//             {
//                 name: "Sandy Koufax",
//                 year: 1965
//             },
//             {
//                 name: "Sandy Koufax",
//                 year: 1963
//             },
//             {
//                 name: "Hal Newhouser",
//                 year: 1945
//             },
//             {
//                 name: "Bob Feller",
//                 year: 1940
//             },
//             {
//                 name: "Bucky Walters",
//                 year: 1939
//             },
//             {
//                 name: "Lefty Gomez",
//                 year: 1937
//             },
//             {
//                 name: "Lefty Gomez",
//                 year: 1934
//             },
//             {
//                 name: "Lefty Grove",
//                 year: 1931
//             },
//             {
//                 name: "Lefty Grove",
//                 year: 1930
//             },
//             {
//                 name: "Walter Johnson",
//                 year: 1924
//             },
//             {
//                 name: "Dazzy Vance",
//                 year: 1924
//             },
//             {
//                 name: "Grover Alexander",
//                 year: 1920
//             },
//             {
//                 name: "Walter Johnson",
//                 year: 1918
//             },
//             {
//                 name: "Hippo Vaughn",
//                 year: 1918
//             },
//             {
//                 name: "Grover Alexander",
//                 year: 1916
//             },
//             {
//                 name: "Grover Alexander",
//                 year: 1915
//             },
//             {
//                 name: "Walter Johnson",
//                 year: 1913
//             },
//             {
//                 name: "Christy Mathewson",
//                 year: 1908
//             },
//             {
//                 name: "Rube Waddell",
//                 year: 1905
//             },
//             {
//                 name: "Cy Young",
//                 year: 1901
//             },
//             {
//                 name: "Amos Rusie",
//                 year: 1894
//             },
//             {
//                 name: "John Clarkson",
//                 year: 1889
//             },
//             {
//                 name: "Tim Keefe",
//                 year: 1888
//             },
//             {
//                 name: "Old Hoss Radbourn",
//                 year: 1884
//             },
//             {
//                 name: "Tommy Bond",
//                 year: 1877
//             }
//         ]
//     },
//     {
//         name: "Guess The Player",
//         headings: [],
//         answers: [
//             {
//                 name: "Aaron Harang",
//                 img: "public/images/MLB/Pitchers/Aaron_Harang_Stats.jpeg"
//             },
//             {
//                 name: "Aaron Hicks",
//                 img: "public/images/MLB/Batters/Aaron_Hicks_Stats_New.jpeg"
//             },
//             {
//                 name: "Adam Dunn",
//                 img: "public/images/MLB/Batters/Adam_Dunn_Stats_New.jpeg"
//             },
//             {
//                 name: "Adrian Gonzalez",
//                 img: "public/images/MLB/Batters/Adrian_Gonzalez_Stats_New.jpeg"
//             },
//             {
//                 name: "Al Leiter",
//                 img: "public/images/MLB/Pitchers/Al_Leiter_Stats.jpeg"
//             },
//             {
//                 name: "Andrelton Simmons",
//                 img: "public/images/MLB/Batters/Andrelton_Simmons_Stats_New.jpeg"
//             },
//             {
//                 name: "Armando Benitez",
//                 img: "public/images/MLB/Pitchers/Armando_Benitez_Stats.jpeg"
//             },
//             {
//                 name: "Asdrubal Cabrera",
//                 img: "public/images/MLB/Batters/Asdrubal_Cabrera_Stats_New.jpeg"
//             },
//             {
//                 name: "Ben Sheets",
//                 img: "public/images/MLB/Pitchers/Ben_Sheets_Stats.jpeg"
//             },
//             {
//                 name: "BJ Upton",
//                 img: "public/images/MLB/Batters/BJ_Upton_Stats_New.jpeg"
//             },
//             {
//                 name: "Bobby Abreu",
//                 img: "public/images/MLB/Batters/Bobby_Abreu_Stats_New.jpeg"
//             },
//             {
//                 name: "Brad Lidge",
//                 img: "public/images/MLB/Pitchers/Brad_Lidge_Stats.jpeg"
//             },
//             {
//                 name: "Brandon Inge",
//                 img: "public/images/MLB/Batters/Brandon_Inge_Stats_New.jpeg"
//             },
//             {
//                 name: "Brandon Phillips",
//                 img: "public/images/MLB/Batters/Brandon_Phillips_Stats_New.jpeg"
//             },
//             {
//                 name: "Brian Dozier",
//                 img: "public/images/MLB/Batters/Brian_Dozier_Stats_New.jpeg"
//             },
//             {
//                 name: "Brian Giles",
//                 img: "public/images/MLB/Batters/Brian_Giles_Stats_New.jpeg"
//             },
//             {
//                 name: "Brian McCann",
//                 img: "public/images/MLB/Batters/Brian_McCann_Stats_New.jpeg"
//             },
//             {
//                 name: "Bronson Arroyo",
//                 img: "public/images/MLB/Pitchers/Bronson_Arroyo_Stats.jpeg"
//             },
//             {
//                 name: "Carlos Zambrano",
//                 img: "public/images/MLB/Pitchers/Carlos_Zambrano_Stats.jpeg"
//             },
//             {
//                 name: "Chase Utley",
//                 img: "public/images/MLB/Batters/Chase_Utley_Stats_New.jpeg"
//             },
//             {
//                 name: "Chris Ianetta",
//                 img: "public/images/MLB/Batters/Chris_Ianetta_Stats_New.jpeg"
//             },
//             {
//                 name: "Curt Schilling",
//                 img: "public/images/MLB/Pitchers/Curt_Schilling_Stats.jpeg"
//             },
//             {
//                 name: "Daisuke Matsuzaka",
//                 img: "public/images/MLB/Pitchers/Daisuke_Matsuzaka_Stats.jpeg"
//             },
//             {
//                 name: "Dan Uggla",
//                 img: "public/images/MLB/Batters/Dan_Uggla_Stats_New.jpeg"
//             },
//             {
//                 name: "Dellin Betances",
//                 img: "public/images/MLB/Pitchers/Dellin_Betances_Stats.jpeg"
//             },
//             {
//                 name: "Edwin Encarnacion",
//                 img: "public/images/MLB/Batters/Edwin_Encarnacion_Stats_New.jpeg"
//             },
//             {
//                 name: "Evan Gattis",
//                 img: "public/images/MLB/Batters/Evan_Gattis_Stats_New.jpeg"
//             },
//             {
//                 name: "Fernando Rodney",
//                 img: "public/images/MLB/Pitchers/Fernando_Rodney_Stats.jpeg"
//             },
//             {
//                 name: "Francisco Rodriguez",
//                 img: "public/images/MLB/Pitchers/Francisco_Rodriguez_Stats.jpeg"
//             },
//             {
//                 name: "Grady Sizemore",
//                 img: "public/images/MLB/Batters/Grady_Sizemore_Stats_New.jpeg"
//             },
//             {
//                 name: "Howie Kendrick",
//                 img: "public/images/MLB/Batters/Howie_Kendrick_Stats_New.jpeg"
//             },
//             {
//                 name: "Jair Jurrjens",
//                 img: "public/images/MLB/Pitchers/Jair_Jurrjens_Stats.jpeg"
//             },
//             {
//                 name: "Jake Peavy",
//                 img: "public/images/MLB/Pitchers/Jake_Peavy_Stats.jpeg"
//             },
//             {
//                 name: "James Shields",
//                 img: "public/images/MLB/Pitchers/James_Shields_Stats.jpeg"
//             },
//             {
//                 name: "Jason Heyward",
//                 img: "public/images/MLB/Batters/Jason_Heyward_Stats_New.jpeg"
//             },
//             {
//                 name: "Jason Schmidt",
//                 img: "public/images/MLB/Pitchers/Jason_Schmidt_Stats.jpeg"
//             },
//             {
//                 name: "Jay Bruce",
//                 img: "public/images/MLB/Batters/Jay_Bruce_Stats_New.jpeg"
//             },
//             {
//                 name: "Jeremy Hellickson",
//                 img: "public/images/MLB/Pitchers/Jeremy_Hellickson_Stats.jpeg"
//             },
//             {
//                 name: "Jeurys Familia",
//                 img: "public/images/MLB/Pitchers/Jeurys_Familia_Stats.jpeg"
//             },
//             {
//                 name: "Jimmy Rollins",
//                 img: "public/images/MLB/Batters/Jimmy_Rollins_Stats_New.jpeg"
//             },
//             {
//                 name: "Joba Chamberlain",
//                 img: "public/images/MLB/Pitchers/Joba_Chamberlain_Stats.jpeg"
//             },
//             {
//                 name: "Joe Nathan",
//                 img: "public/images/MLB/Pitchers/Joe_Nathan_Stats.jpeg"
//             },
//             {
//                 name: "Joey Votto",
//                 img: "public/images/MLB/Batters/Joey_Votto_Stats_New.jpeg"
//             },
//             {
//                 name: "Jonathan Papelbon",
//                 img: "public/images/MLB/Pitchers/Jonathan_Papelbon_Stats.jpeg"
//             },
//             {
//                 name: "Josh Harrison",
//                 img: "public/images/MLB/Batters/Josh_Harrison_Stats_New.jpeg"
//             },
//             {
//                 name: "Julio Teheran",
//                 img: "public/images/MLB/Pitchers/Julio_Teheran_Stats.jpeg"
//             },
//             {
//                 name: "Justin Morneau",
//                 img: "public/images/MLB/Batters/Justin_Morneau_Stats_New.jpeg"
//             },
//             {
//                 name: "Justin Upton",
//                 img: "public/images/MLB/Batters/Justin_Upton_Stats_New.jpeg"
//             },
//             {
//                 name: "Kendrys Morales",
//                 img: "public/images/MLB/Batters/Kendrys_Morales_Stats_New.jpeg"
//             },
//             {
//                 name: "Kenny Lofton",
//                 img: "public/images/MLB/Batters/Kenny_Lofton_Stats_New.jpeg"
//             },
//             {
//                 name: "Kerry Wood",
//                 img: "public/images/MLB/Pitchers/Kerry_Wood_Stats.jpeg"
//             },
//             {
//                 name: "Kurt Suzuki",
//                 img: "public/images/MLB/Batters/Kurt_Suzuki_Stats_New.jpeg"
//             },
//             {
//                 name: "Mark Buehrle",
//                 img: "public/images/MLB/Pitchers/Mark_Buehrle_Stats.jpeg"
//             },
//             {
//                 name: "Mark Mulder",
//                 img: "public/images/MLB/Pitchers/Mark_Mulder_Stats.jpeg"
//             },
//             {
//                 name: "Mark Trumbo",
//                 img: "public/images/MLB/Batters/Mark_Trumbo_Stats_New.jpeg"
//             },
//             {
//                 name: "Martin Prado",
//                 img: "public/images/MLB/Batters/Martin_Prado_Stats_New.jpeg"
//             },
//             {
//                 name: "Masahiro Tanaka",
//                 img: "public/images/MLB/Pitchers/Masahiro_Tanaka_Stats.jpeg"
//             },
//             {
//                 name: "Matt Cain",
//                 img: "public/images/MLB/Pitchers/Matt_Cain_Stats.jpeg"
//             },
//             {
//                 name: "Matt Moore",
//                 img: "public/images/MLB/Pitchers/Matt_Moore_Stats.jpeg"
//             },
//             {
//                 name: "Max Kepler",
//                 img: "public/images/MLB/Batters/Max_Kepler_Stats_New.jpeg"
//             },
//             {
//                 name: "Michael Cuddyer",
//                 img: "public/images/MLB/Batters/Michael_Cuddyer_Stats_New.jpeg"
//             },
//             {
//                 name: "Miguel Sano",
//                 img: "public/images/MLB/Batters/Miguel_Sano_Stats_New.jpeg"
//             },
//             {
//                 name: "Mike Mussina",
//                 img: "public/images/MLB/Pitchers/Mike_Mussina_Stats.jpeg"
//             },
//             {
//                 name: "Neil Walker",
//                 img: "public/images/MLB/Batters/Neil_Walker_Stats_New.jpeg"
//             },
//             {
//                 name: "Nelson Cruz",
//                 img: "public/images/MLB/Batters/Nelson_Cruz_Stats_New.jpeg"
//             },
//             {
//                 name: "Noah Syndergaard",
//                 img: "public/images/MLB/Pitchers/Noah_Syndergaard_Stats.jpeg"
//             },
//             {
//                 name: "Paul Goldschmidt",
//                 img: "public/images/MLB/Batters/Paul_Goldschmidt_Stats_New.jpeg"
//             },
//             {
//                 name: "Pedro Alvarez",
//                 img: "public/images/MLB/Batters/Pedro_Alvarez_Stats_New.jpeg"
//             },
//             {
//                 name: "Phil Hughes",
//                 img: "public/images/MLB/Pitchers/Phil_Hughes_Stats.jpeg"
//             },
//             {
//                 name: "Placido Polanco",
//                 img: "public/images/MLB/Batters/Placido_Polanco_Stats_New.jpeg"
//             },
//             {
//                 name: "Rick Ankiel",
//                 img: "public/images/MLB/Batters/Rick_Ankiel_Stats_New.jpeg"
//             },
//             {
//                 name: "Roy Oswalt",
//                 img: "public/images/MLB/Pitchers/Roy_Oswalt_Stats.jpeg"
//             },
//             {
//                 name: "Russell Martin",
//                 img: "public/images/MLB/Batters/Russell_Martin_Stats_New.jpeg"
//             },
//             {
//                 name: "Ryan Howard",
//                 img: "public/images/MLB/Batters/Ryan_Howard_Stats_New.jpeg"
//             },
//             {
//                 name: "Scott Kazmir",
//                 img: "public/images/MLB/Pitchers/Scott_Kazmir_Stats.jpeg"
//             },
//             {
//                 name: "Scott Rolen",
//                 img: "public/images/MLB/Batters/Scott_Rolen_Stats_New.jpeg"
//             },
//             {
//                 name: "Sean Casey",
//                 img: "public/images/MLB/Batters/Sean_Casey_Stats_New.jpeg"
//             },
//             {
//                 name: "Shin Soo Choo",
//                 img: "public/images/MLB/Batters/Shin_Soo_Choo_Stats_New.jpeg"
//             },
//             {
//                 name: "Tim Hudson",
//                 img: "public/images/MLB/Pitchers/Tim_Hudson_Stats.jpeg"
//             },
//             {
//                 name: "Tim Wakefield",
//                 img: "public/images/MLB/Pitchers/Tim_Wakefield_Stats.jpeg"
//             },
//             {
//                 name: "Torii Hunter",
//                 img: "public/images/MLB/Batters/Torii_Hunter_Stats_New.jpeg"
//             },
//             {
//                 name: "Travis Hafner",
//                 img: "public/images/MLB/Batters/Travis_Hafner_Stats_New.jpeg"
//             },
//             {
//                 name: "Troy Glaus",
//                 img: "public/images/MLB/Batters/Troy_Glaus_Stats_New.jpeg"
//             },
//             {
//                 name: "Ubaldo Jimenez",
//                 img: "public/images/MLB/Pitchers/Ubaldo_Jimenez_Stats.jpeg"
//             },
//             {
//                 name: "Vernon Wells",
//                 img: "public/images/MLB/Batters/Vernon_Wells_Stats_New.jpeg"
//             },
//             {
//                 name: "Victor Martinez",
//                 img: "public/images/MLB/Batters/Victor_Martinez_Stats_New.jpeg"
//             },
//             {
//                 name: "Victor Zambrano",
//                 img: "public/images/MLB/Pitchers/Victor_Zambrano_Stats.jpeg"
//             },
//             {
//                 name: "Yovani Gallardo",
//                 img: "public/images/MLB/Pitchers/Yovani_Gallardo_Stats.jpeg"
//             },
//             {
//                 name: "Zack Britton",
//                 img: "public/images/MLB/Pitchers/Zack_Britton_Stats.jpeg"
//             }
//         ]
//     }
// ];

// let NBAQuizzes = [
//     {
//         name: "Guess The Player",
//         headings: [],
//         answers: [
//             {
//                 name: "Aaron Gordon",
//                 img: "public/images/NBA/Aaron_Gordon_Stats.jpeg"
//             },
//             {
//                 name: "Al Hordford",
//                 img: "public/images/NBA/Al_Horford_Stats.jpeg"
//             },
//             {
//                 name: "Andre Iguodala",
//                 img: "public/images/NBA/Andre_Iguodala_Stats.jpeg"
//             },
//             {
//                 name: "Andrei Kirilenko",
//                 img: "public/images/NBA/Andrei_Kirilenko_Stats.jpeg"
//             },
//             {
//                 name: "Beno Udrih",
//                 img: "public/images/NBA/Beno_Udrih_Stats.jpeg"
//             },
//             {
//                 name: "Boban Marjanovic",
//                 img: "public/images/NBA/Boban_MarjanovcStats.jpeg"
//             },
//             {
//                 name: "Charles Oakley",
//                 img: "public/images/NBA/Charles_Oakley_Stats.jpeg"
//             },
//             {
//                 name: "Chimezie Metu",
//                 img: "public/images/NBA/Chimezie_Metu_Stats.jpeg"
//             },
//             {
//                 name: "CJ McCollum",
//                 img: "public/images/NBA/CJ_McCollum_Stats.jpeg"
//             },
//             {
//                 name: "Cliff Robinson",
//                 img: "public/images/NBA/Cliff_Robinson_Stats.jpeg"
//             },
//             {
//                 name: "Cody Zeller",
//                 img: "public/images/NBA/Cody_Zeller_Stats.jpeg"
//             },
//             {
//                 name: "Craig Ehlo",
//                 img: "public/images/NBA/Craig_Ehlo_Stats.jpeg"
//             },
//             {
//                 name: "Dante Exum",
//                 img: "public/images/NBA/Dante_Exum_Stats.jpeg"
//             },
//             {
//                 name: "DeAnthony Melton",
//                 img: "public/images/NBA/DeAnthony_Melton_Stats.jpeg"
//             },
//             {
//                 name: "Derek Fisher",
//                 img: "public/images/NBA/Derek_Fisher_Stats.jpeg"
//             },
//             {
//                 name: "Derrick Favors",
//                 img: "public/images/NBA/Derrick_Favors_Stats.jpeg"
//             },
//             {
//                 name: "Detlef Schrempf",
//                 img: "public/images/NBA/Detlef_Schrempf_Stats.jpeg"
//             },
//             {
//                 name: "Doug McDermott",
//                 img: "public/images/NBA/Doug_McDermott_Stats.jpeg"
//             },
//             {
//                 name: "Dwight Howard",
//                 img: "public/images/NBA/Dwight_Howard_Stats.jpeg"
//             },
//             {
//                 name: "Emmanuel Mudiay",
//                 img: "public/images/NBA/Emmanuel_Mudiay_Stats.jpeg"
//             },
//             {
//                 name: "Glen Rice",
//                 img: "public/images/NBA/Glen_Rice_Stats.jpeg"
//             },
//             {
//                 name: "Horace Grant",
//                 img: "public/images/NBA/Horace_Grant_Stats.jpeg"
//             },
//             {
//                 name: "Ivica Zubac",
//                 img: "public/images/NBA/Ivica_Zubac_Stats.jpeg"
//             },
//             {
//                 name: "Jack Sikma",
//                 img: "public/images/NBA/Jack_Sikma_Stats.jpeg"
//             },
//             {
//                 name: "Jamal Mashburn",
//                 img: "public/images/NBA/Jamal_Mashburn_Stats.jpeg"
//             },
//             {
//                 name: "James Wiseman",
//                 img: "public/images/NBA/James_Wiseman_Stats.jpeg"
//             },
//             {
//                 name: "Jarrett Jack",
//                 img: "public/images/NBA/Jarrett_Jack_Stats.jpeg"
//             },
//             {
//                 name: "Jason Terry",
//                 img: "public/images/NBA/Jason_Terry_Stats.jpeg"
//             },
//             {
//                 name: "JaVale McGee",
//                 img: "public/images/NBA/JaVale_McGee_Stats.jpeg"
//             },
//             {
//                 name: "Jermaine Oneal",
//                 img: "public/images/NBA/Jermaine_Oneal_Stats.jpeg"
//             },
//             {
//                 name: "Jerry West",
//                 img: "public/images/NBA/Jerry_West_Stats.jpeg"
//             },
//             {
//                 name: "John Havliceck",
//                 img: "public/images/NBA/John_Havliceck_Stats.jpeg"
//             },
//             {
//                 name: "Jonas Valanciunas",
//                 img: "public/images/NBA/Jonas_Valanciunas_Stats.jpeg"
//             },
//             {
//                 name: "Khris Middleton",
//                 img: "public/images/NBA/Khris_Middleton_Stats.jpeg"
//             },
//             {
//                 name: "Kyle Korver",
//                 img: "public/images/NBA/Kyle_Korver_Stats.jpeg"
//             },
//             {
//                 name: "Lamar Odom",
//                 img: "public/images/NBA/Lamar_Odom_Stats.jpeg"
//             },
//             {
//                 name: "LaMarcus Aldridge",
//                 img: "public/images/NBA/LaMarcus_Aldridge_Stats.jpeg"
//             },
//             {
//                 name: "Lauri Markkanen",
//                 img: "public/images/NBA/Lauri_Markkanen_Stats.jpeg"
//             },
//             {
//                 name: "Malik Monk",
//                 img: "public/images/NBA/Malik_Monk_Stats.jpeg"
//             },
//             {
//                 name: "Markelle Fultz",
//                 img: "public/images/NBA/Markelle_Fultz_Stats.jpeg"
//             },
//             {
//                 name: "Michael Finley",
//                 img: "public/images/NBA/Michael_Finley_Stats.jpeg"
//             },
//             {
//                 name: "Mike Conley",
//                 img: "public/images/NBA/Mike_Conley_Stats.jpeg"
//             },
//             {
//                 name: "Monte Morris",
//                 img: "public/images/NBA/Monte_Morris_Stats.jpeg"
//             },
//             {
//                 name: "Neemias Queta",
//                 img: "public/images/NBA/Neemias_Queta_Stats.jpeg"
//             },
//             {
//                 name: "Nick Young",
//                 img: "public/images/NBA/Nick_Young_Stats.jpeg"
//             },
//             {
//                 name: "Nikola Vucevic",
//                 img: "public/images/NBA/Nikola_Vucevic_Stats.jpeg"
//             },
//             {
//                 name: "OJ Mayo",
//                 img: "public/images/NBA/OJ_Mayo_Stats.jpeg"
//             },
//             {
//                 name: "Otis Thorpe",
//                 img: "public/images/NBA/Otis_Thorpe_Stats.jpeg"
//             },
//             {
//                 name: "Patty Mills",
//                 img: "public/images/NBA/Patty_Mills_Stats.jpeg"
//             },
//             {
//                 name: "Pete Maravich",
//                 img: "public/images/NBA/Pete_Maravich_Stats.jpeg"
//             },
//             {
//                 name: "Robert Parish",
//                 img: "public/images/NBA/Robert_Parish_Stats.jpeg"
//             },
//             {
//                 name: "Rod Strickland",
//                 img: "public/images/NBA/Rod_Strickland_Stats.jpeg"
//             },
//             {
//                 name: "Rodney McGruder",
//                 img: "public/images/NBA/Rodney_McGruder_Stats.jpeg"
//             },
//             {
//                 name: "Shawn Marion",
//                 img: "public/images/NBA/Shawn_Marion_Stats.jpeg"
//             },
//             {
//                 name: "Stephon Marbury",
//                 img: "public/images/NBA/Stephon_Marbury_Stats.jpeg"
//             },
//             {
//                 name: "Thaddeus Young",
//                 img: "public/images/NBA/Thaddeus_Young_Stats.jpeg"
//             },
//             {
//                 name: "TJ McConnell",
//                 img: "public/images/NBA/TJ_McConnell_Stats.jpeg"
//             },
//             {
//                 name: "Tyler Zeller",
//                 img: "public/images/NBA/Tyler_Zeller_Stats.jpeg"
//             },
//             {
//                 name: "Tyson Chandler",
//                 img: "public/images/NBA/Tyson_Chandler_Stats.jpeg"
//             },
//             {
//                 name: "Wesley Matthews",
//                 img: "public/images/NBA/Wesley_Matthews_Stats.jpeg"
//             },
//         ]
//     }
// ];
// let NCAAQuizzes = [
//     {
//         name: "Guess The Player",
//         headings: [],
//         answers: []
//     }
// ];
// let TVQuizzes = [
//     {
//         name: "Guess The Theme Song",
//         headings: [],
//         answers: []
//     }
// ];

//Enable all buttons
const resetButtons = () => {
    mlb.disabled = false;
    nba.disabled = false;
    ncaa.disabled = false;
    tv.disabled = false;
}

//Remove all list items from the webpage
const resetQuizList = () => {
    quizList.innerHTML = "";
}

//Display the quizzes for the MLB category
const selectMLB = (e) => {
    createList(e.target);
}

//Display the quizzes for the NBA category
const selectNBA = (e) => {
    createList(e.target);
}

//Display the quizzes for the NCAA category
const selectNCAA = (e) => {
    createList(e.target);
}

//Display the quizzes for the TV category
const selectTV = (e) => {
    createList(e.target);
}

//Present the slides for the "Guess The Player" quizzes
const showSlides = (n) => {
    //Capture the "div" elements containing the player screenshots
    let slides = document.getElementsByClassName("guessPlayer");
    //Capture the "span" elements containing the player names
    let playerNames = document.getElementsByClassName("playerName");
    //Capture the "span" elements displaying the slide count
    let slideCount = document.querySelector(".slideCount");
    //Capture the slide number "button" elements 
    let slideNumbers = document.getElementsByClassName("slideNumber");
    console.log(slideNumbers);
    //If the slide count goes below 1, reset the count to the last slide number
    if (n < 1) { slideIndex = slides.length; }
    //If the slide count goes over the number of slides, reset the count to 1
    if (n > slides.length) { slideIndex = 1; }
    //Hide all of the "Guess The Player" slides
    for (let i = 0; i < slides.length; i++){
        slides[i].setAttribute('class', 'guessPlayer hidden')
        slideCount.innerText = `${slideIndex}/${slides.length}`;
        slideNumbers[i].setAttribute('id', '');
    }
    //Disable the textbox for the solved players
    if (playerNames[slideIndex - 1].classList.contains("correct") || giveUp == true) {
        answerTextbox.disabled = true;
    } else {
        answerTextbox.disabled = false;
    }
    //Display the player screenshot at the specified index
    slides[slideIndex - 1].setAttribute('class', 'guessPlayer current');
    slideNumbers[slideIndex - 1].setAttribute('id', 'currentNumber');
}

//Increase the slide index by 1
const nextSlide = () => {
    slideIndex++;
    showSlides(slideIndex);
}

//Decrease the slide index by 1
const prevSlide = () => {
    slideIndex--;
    showSlides(slideIndex);
}

//Select specified slide
const selectSlide = (e) => {
    slideIndex = e.target.innerText;
    showSlides(slideIndex);
}

//Present the names of the unsolved players
const iGiveUp = () => {
    giveUp = true;
    //Capture the "div" elements containing the player screenshots
    let slides = document.querySelectorAll(".guessPlayer");
    let slideNumbers = document.getElementsByClassName("slideNumber");
    for (let i = 0; i < slides.length; i++){
        //Show the names of the unsolved players in red
        if (!slides[i].lastChild.classList.contains("correct")) {
            slides[i].style = "opacity: 0.5";
            slides[i].lastChild.setAttribute("class", "playerName incorrect");
        }
        if (!slideNumbers[i].classList.contains("correctNumber")) {
            slideNumbers[i].setAttribute('class', 'slideNumber incorrectNumber');
        }
    }
}

//Create the list of available quizzes in each category
const createList = (category) => {
    //Enable all of the buttons
    resetButtons();
    //Remove any present list elements
    resetQuizList();
    //Disable the button for the selected category
    category.disabled = true;
    //Create the "list" element to hold the quizzes in each category
    let list = document.createElement("ul");
    list.setAttribute('class', 'list');
    //Create list items based on the selected category
    switch (category.innerText) {
        //Display all MLB Quizzes
        case "MLB":
            selectedCategory = "MLB";
            MLBQuizzes.forEach((quiz) => {
                let quizName = document.createElement("li");
                quizName.innerText = quiz.name;
                quizName.setAttribute('class', 'list_item');
                quizName.addEventListener('click', selectQuiz);
                list.appendChild(quizName);
            })
            break;
        //Display all NBA Quizzes
        case "NBA":
            selectedCategory = "NBA";
            NBAQuizzes.forEach((quiz) => {
                let quizName = document.createElement("li");
                quizName.innerText = quiz.name;
                quizName.setAttribute('class', 'list_item');
                quizName.addEventListener('click', selectQuiz);
                list.appendChild(quizName);
            })
            break;
        //Display all NCAA Quizzes
        case "NCAA":
            selectedCategory = "NCAA";
            NCAAQuizzes.forEach((quiz) => {
                let quizName = document.createElement("li");
                quizName.innerText = quiz.name;
                quizName.setAttribute('class', 'list_item');
                quizName.addEventListener('click', selectQuiz);
                list.appendChild(quizName);
            })
            break;
        //Display all TV Quizzes
        case "TV":
            selectedCategory = "TV";
            TVQuizzes.forEach((quiz) => {
                let quizName = document.createElement("li");
                quizName.innerText = quiz.name;
                quizName.setAttribute('class', 'list_item');
                quizName.addEventListener('click', selectQuiz);
                list.appendChild(quizName);
            })
            break;
        default:
            break;
    }
    quizList.appendChild(list);
}

//Present the quiz selected by the player
const selectQuiz = (e) => {
    switch (selectedCategory) {
        case "MLB":
            //Capture the name of the selected quiz
            let mlbQuiz = MLBQuizzes.filter((quiz) => e.target.innerText == quiz.name);
            currentQuiz = mlbQuiz[0].name;
            //Capture the answers of the selected quiz
            // answerBank = mlbQuiz[0].answers;
            //Create the table/carousel for the selected quiz
            createTable(mlbQuiz[0]);
            //Enable all buttons
            resetButtons();
            //Remove list items from the screen
            resetQuizList();
            break;
        case "NBA":
            //Capture the name of the selected quiz
            let nbaQuiz = NBAQuizzes.filter((quiz) => e.target.innerText == quiz.name);
            currentQuiz = nbaQuiz[0].name;
            //Capture the answers of the selected quiz
            answerBank = nbaQuiz[0].answers;
            //Create the table/carousel of the selected quiz
            createTable(nbaQuiz[0]);
            //Enable all buttons
            resetButtons();
            //Remove list items from the screen
            resetQuizList();
            break;
        case "NCAA":
            //Capture the name of the selected quiz
            let ncaaQuiz = NCAAQuizzes.filter((quiz) => e.target.innerText == quiz.name);
            currentQuiz = ncaaQuiz[0].name;
            //Capture the answers of the selected quiz
            answerBank = ncaaQuiz[0].answers;
            //Create the table/carousel of the selected quiz
            createTable(ncaaQuiz[0]);
            //Enable all buttons
            resetButtons();
            //Remove list items from the screen
            resetQuizList();
            break;
        case "TV":
            //Capture the name of the selected quiz
            let tvQuiz = TVQuizzes.filter((quiz) => e.target.innerText == quiz.name);
            currentQuiz = tvQuiz[0].name;
            //Capture the answers of the selected quiz
            answerBank = tvQuiz[0].answers;
            //Create the table/carousel of the selected quiz
            createTable(tvQuiz[0]);
            //Enable all buttons
            resetButtons();
            //Remove list items from the screen
            resetQuizList();
            break;
        default:
            break;
    }
}

const createTable = (quiz) => {
    //Remove the Table if it exists
    resetTable();
    //Remove the images if they exist
    resetImages();
    //For Non "Guess The Player" Quizzes
    if (quiz.name != "Guess The Player") {
        //Create the row for table headings
        let headerRow = document.createElement('tr');
        //Create the "Year" table heading
        let yearHeading = document.createElement('th');
        yearHeading.setAttribute('class', 'heading');
        yearHeading.innerText = quiz.headings[0];
        //Create the "Name" table heading
        let nameHeading = document.createElement('th');
        nameHeading.setAttribute('class', 'heading');
        nameHeading.innerText = quiz.headings[1];
        headerRow.append(yearHeading, nameHeading);
        tableHeader.appendChild(headerRow);
        //Create the table body rows for all of the quiz answers
        quiz.answers.forEach((answer) => {
            //Create a new row in the table
            let newRow = document.createElement('tr');
            //Create a new element in the "Year" column
            let yearEntry = document.createElement('th');
            yearEntry.setAttribute('class', 'ready year');
            //Create a new element in the "Name" column
            let nameEntry = document.createElement('td');
            nameEntry.setAttribute('class', `${answer.name.toLowerCase().replace(' ', '-')} ready name`)
            yearEntry.innerText = answer.year;
            newRow.append(yearEntry, nameEntry);
            tableBody.appendChild(newRow);
        })
        table.setAttribute('class', 'ready');
    //For "Guess The Player" Quizzes
    } else {
        //Reset the slide index to 1
        slideIndex = 1;
        //Create the previous button
        let prevButton = document.createElement("a");
        prevButton.setAttribute('class', 'prev');
        prevButton.innerHTML = "&#10094;";
        prevButton.onclick = prevSlide;
        //Create the next button
        let nextButton = document.createElement("a");
        nextButton.setAttribute('class', 'next');
        nextButton.innerHTML = "&#10095;";
        nextButton.onclick = nextSlide;
        //Create the element to display the current slide count
        let slideCount = document.createElement("span");
        slideCount.setAttribute('class', 'slideCount');
        slideCount.innerText = "";
        //Create the "Give Up" button
        let giveUp = document.createElement("button");
        giveUp.innerText = "Give Up";
        giveUp.setAttribute('class', 'giveUp');
        giveUp.onclick = iGiveUp;
        let slideCounter = document.createElement("div");
        slideCounter.setAttribute('class', 'slideCounter');
        //Add the created elements to the image carousel
        imageCarousel.append(prevButton, nextButton, slideCount, giveUp, slideCounter);
        //Grab five screenshots
        for (let i = 0; i < 5; i++){
            //Generate a random number
            let index = Math.floor(Math.random() * quiz.answers.length);
            //Grab the random player from the answer bank
            let playerToGuess = quiz.answers.splice(index, 1);
            answerBank.push(playerToGuess)
            //Create the "div" element for the image carousel
            let imgDiv = document.createElement("div");
            imgDiv.setAttribute('class', 'guessPlayer');
            imgDiv.setAttribute('id', `${playerToGuess[0].name.toLowerCase().replaceAll(' ', '-')}`);
            //Create the "img" element for player screenshot
            let bbRefImg = document.createElement("img");
            bbRefImg.setAttribute('style', 'width:100%');
            bbRefImg.setAttribute('src', playerToGuess[0].img);
            //Create the "span" element to hold the player's name
            let playerName = document.createElement("span");
            playerName.innerText = playerToGuess[0].name;
            //Hide the name from the players
            playerName.setAttribute('class', 'playerName hidden');
            //Create "button" element for slide number
            let slideNumber = document.createElement("button");
            slideNumber.innerText = i + 1;
            slideNumber.setAttribute('class', 'slideNumber');
            slideNumber.onclick = selectSlide;
            slideCounter.appendChild(slideNumber);
            imgDiv.append(bbRefImg, playerName);
            imageCarousel.appendChild(imgDiv);
        }
        //Show the first image to the player
        showSlides(slideIndex);
    }
}

//Remove the table from the webpage
const resetTable = () => {
    tableHeader.innerHTML = "";
    tableBody.innerHTML = "";
    table.setAttribute('class', '');
}

//Remove the screenshots from the Image Carousel
const resetImages = () => {
    imageCarousel.innerHTML = "";
}

//Validating the User's Answer
const validateAnswer = (e) => {
    e.preventDefault();
    //Non "Guess The Player" Quizzes
    if (currentQuiz != "Guess The Player") {
        answerBank.forEach((answer) => {
            //Check if the player's guess is in the answerBank
            if (e.target.guess.value.toLowerCase() == answer.name.toLowerCase()) {
                //Check if the answer exists more than once in the answerBank
                let tableRows = document.querySelectorAll(`.${e.target.guess.value.toLowerCase().replaceAll(' ', '-')}`);
                for (const row of tableRows) {
                    //Present the answer within the table
                    row.innerText = e.target.guess.value;
                }
            }
        })
    //"Guess The Player" Quizzes
    } else {
        //Capture the screenshot displayed on the screen
        let playerToGuess = document.querySelector('.current');
        let currentSlide = document.querySelector('#currentNumber');
        //Check if the player's guess is correct
        if (e.target.guess.value.toLowerCase() == playerToGuess.id.replaceAll('-', ' ')) {
            playerToGuess.style = "opacity: 0.5";
            //Show the solved player's name in green
            playerToGuess.lastChild.setAttribute('class', 'playerName correct');
            currentSlide.setAttribute('class', 'slideNumber correctNumber');
            currentSlide.disabled = true;
        }
    }
    //Remove the "correct" answer from the answerBank
    answerBank = answerBank.filter((answer) => answer != e.target.guess.value);
    //Clear the textbox within the answer form
    e.target.guess.value = '';
}

mlb.onclick = selectMLB;
nba.onclick = selectNBA;
ncaa.onclick = selectNCAA;
tv.onclick = selectTV;
answerForm.addEventListener('submit', validateAnswer);
