# meetjs-tweening-three
meetjs Łódź 23.11.2016

### Instalation
    git clone https://github.com/m1gu3l/meetjs-tweening-three.git
    npm i
    
Repo should checkout branch step1 automatically.

### Setup

There's a webpack-dev-server included.

    npm run start
    http://localhost:8080/bin

You should see bar chart rendered using three.js.
    
### Basic Tweener

Let's add some animation. We will four main elements to achieve this.
 - **Tweener** class acts as API. It handles time and updating Tweens.
 - **Tween** contains animation target, `fromProps` and `toProps` state. It represents transition. State is passed as target properties.
 - **Easing** can "bend time", so animation is faster at the beginning and slower at the end. For now, we'll use only linear easing.
 - **Interpolation** provides value between `fromProps` state and `toProps` state.
 

    npm run step2
    
### Read properties from target

    npm run step3
    
We don't want to pass `to` and `from` state every time we want to animate something. We can read state from target properties.
    
    npm run step4
    
There are some issues with multiple animations, all concerning the moment when state is read from target.
When we animate **from** state, we probably want to init right away, When we animate **to**, we want to delay the moment as much as possible.
    
    npm run step5

### Easing

Easing functions are key to good looking animations. You should probably look at [this site](http://easings.net/).

    npm run step6
    
    
### Multiple tweens from array

Nice API is important. We now provide easy way to create multiple tweens from array of targets.

    npm run step7
    

### Interpolation

What if we don't now the exact value to which we want to tween to? Let's calculate relative values from read properties.


    npm run step 8

Until now, all we animated were number values, but now we will be able to animate all other types with custom interpolators.

    npm run step 9
    
### Final demo

Now it looks like proper animation.

    npm run finished