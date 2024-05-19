
export let notes = [
  {
    title: "Hello 👋",
    content: "Saying hello, from earth",
    created_at: Date.now(),
    updated_at: Date.now(),
  },


  {
    title: "Python 🐍 love",
    content: "# Python is a beautiful programming language.",
    created_at: Date.now(),
    updated_at: Date.now(),
  },


  {
    title: "Zuma revenge tips.",
    content: "# Here is some Zuma revenge cheat code. Win this game quickly.",
    created_at: Date.now(),
    updated_at: Date.now(),
  },

  {
    title: "Error Handling",
    content: "## Way to solve my day to day bugs challenges. ",
    created_at: Date.now(),
    updated_at: Date.now(),
  },

  {
      content: "# This is some note. Good stuffs are comming",
      title: "The first note",
      created_at: Date.now(),
      updated_at: Date.now()
    },
    {
      content: "## The Pinnapple notes. So many things are done here. ",
      title: "Pinnapple use for healthcare.",
      created_at: Date.now(),
      updated_at: Date.now(),
    },
    {
      content: "# Reconnaisser que Dieu nous a laisser l'intelligence et l'intellect pour transcender. ",
      title: "Identification à la personnalité",
      created_at: Date.now(),
      updated_at: Date.now(),
    }

];
export const colorList = [
  "#99c1f1",
	"#8FF0A4",
	"#F9F06B",
	"#FFBE6F",
	"#F66151",
	"#DC8ADD",
	"#CDAB8F",
	"#77767B",
	"#62A0EA",
	"#57E389",
	"#F8E45C",
	"#FFA348",
	"#ED333B",
	"#C061CB",
	"#B5835A",
	"#5E5C64",
	"#3584E4",
	"#33D17A",
	"#F6D32D",
	"#FF7800",
	"#E01B24",
	"#9141AC",
	"#986A44",
	"#3D3846",
	"#1C71D8",
	"#2EC27E",
	"#F5C211",
	"#E66100",
	"#C01C28",
	"#813D9C",
	"#865E3C",
	"#241F31",
	"#1A5FB4",
	"#26A269",
	"#E5A50A",
	"#C64600",
	"#A51D2D",
	"#613583",
	"#63452C",
	"#000000",
]
// export const colorList = [
//   [
//     "#99c1f1",
//     "#62A0EA",
//     "#3584E4",
//     "#1C71D8",
//     "#1A5FB4"
//   ],
//   [
//     "#8FF0A4",
//     "#57E389",
//     "#33D17A",
//     "#2EC27E",
//     "#26A269"
//   ],
//
//   [
//     "#F9F06B",
//     "#F8E45C",
//     "#F6D32D",
//     "#F5C211",
//     "#E5A50A"
//   ],
//
//   [
//     "#FFBE6F",
//     "#FFA348",
//     "#FF7800",
//     "#E66100",
//     "#C64600"
//   ],
//   [
//     "#F66151",
//     "#ED333B",
//     "#E01B24",
//     "#C01C28",
//     "#A51D2D"
//   ],
//   [
//     "#DC8ADD",
//     "#C061CB",
//     "#9141AC",
//     "#813D9C",
//     "#613583",
//   ],
//   [
//     "#CDAB8F",
//     "#B5835A",
//     "#986A44",
//     "#865E3C",
//     "#63452C",
//   ],
//   [
//     "#77767B",
//     "#5E5C64",
//     "#3D3846",
//     "#241F31",
//     "#000000"
//   ]
//
// ]

export const autoSavingTime = 3000

export const editor_fulfill = `
# Hello universe !

## What's up guys !!
Here is Stanislas Fructueux HOUETO (Stan if you want). Software developer and tech anthousiast. Loving code cool and interesting stuff with beautiful UI !

Let-s talk a little bit about this app. It's a Markdown note taking app.
* Note taking app : based on *Markdown* syntax (The <strong>editor </strong> support __HTML__ also)
* Others bunch of functionnality are comming !!!


---

1. ### Fonctionnalities
* [x] Support code intergration
* [x] Live rendering

###  Example of code
~~~js
let choice = true;
if (choice){
   console.log("The choice is true");
}else{
console.log(false)
}
// function
function foo(){
   return "bar";
}
~~~


### Another code example in python
~~~python
   test = 1
   print("Hello world")

   def test():
      print("We're inside test func")
      return

~~~

---
## Some cites
> Life's good. LG.

### Some fruits
* Apple
* Banana
  * Coconut
  * Strawberry


---
We don't have a name for our app yet. But some kind people try to help me about.

| Friend | Proposition | other information |
| :- | :-: | -: |
| Me | Bootiful | A little bit funny, I know ...|
|Mom|  | I always trying to explain her what is computer science. But she always prays for me. Love you mom |
| Rayon de soleil | Horizon or bluesky | She knows that I like to look at the sky and the clouds |
|Vivi| 😓 | She do not see its usefulness |

`;

