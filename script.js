//Mouse circle
const mouseCircle=document.querySelector(".mouse-circle");
const mouseDot=document.querySelector(".mouse-dot");

const circleFn = (x,y)=>{
mouseCircle.style.cssText =`top:${y}px; left:${x}px; opacity:1`;
mouseDot.style.cssText =`top:${y}px; left:${x}px; opacity:1`;
}

//Animated circles
const circles=document.querySelectorAll(".circle");
const mainImg=document.querySelector(".main-circle img");

let mX=0;
let mY=0;
const z =100;
const animatedCircles=(e,x,y)=>{
  if(x<mX){
      circles.forEach((circle)=>{
          circle.style.left=`${z}px`
      })
      mainImg.style.left=`${z}px`;
  } else if(x> mX){
    circles.forEach((circle)=>{
        circle.style.left=`-${z}px`
    })
    mainImg.style.left=`-${z}px`;
  }

  if (y< mY){
    circles.forEach((circle)=>{
        circle.style.top=`${z}px`
    })
    mainImg.style.top=`${z}px`;
  } else if (y > mY){
    circles.forEach((circle)=>{
        circle.style.top=`-${z}px`
    })
    mainImg.style.top=`-${z}px`; 
  }
    mX=e.clientX;
    mY=e.clientY;
}
document.body.addEventListener("mousemove",(e)=>{
    let x = e.clientX;
    let y = e.clientY;

circleFn(x,y)
animatedCircles(e,x,y)
});

document.body.addEventListener("mouseleave",()=>{
    mouseCircle.style.opacity='0';
    mouseDot.style.opacity='0';
})

//Main Button

const mainBtns = document.querySelectorAll(".main-btn");
mainBtns.forEach(btn=>{
    let ripple;
    btn.addEventListener('mouseenter',e=>{
    const left=e.clientX-e.target.getBoundingClientRect().left;
    const top=e.clientY-e.target.getBoundingClientRect().top;

    ripple=document.createElement("div");
    ripple.classList.add("ripple")
    ripple.style.left=`${left}px`;
    ripple.style.top=`${top}px`;
    btn.prepend(ripple);
});
btn.addEventListener('mouseleave',()=>{
    btn.removeChild(ripple)
});
});

//Navigation

const menuIcon = document.querySelector('.menu-icon');
const navBar = document.querySelector('.navbar');

document.addEventListener('scroll',()=>{
    menuIcon.classList.add('show-menu-icon');
    navBar.classList.add('hide-navbar');

    if(window.scrollY===0){
        menuIcon.classList.remove('show-menu-icon');
        navBar.classList.remove('hide-navbar');
    }
});
menuIcon.addEventListener('click',()=>{
    menuIcon.classList.remove('show-menu-icon');
    navBar.classList.remove('hide-navbar');
})

//Projects
const projects = document.querySelectorAll(".project");

projects.forEach((project)=>{
    project.addEventListener("mouseenter",()=>{
        project.firstElementChild.style.top=
        `-${project.firstElementChild.offsetHeight-project.offsetHeight+20}px`;
    });

    project.addEventListener("mouseleave",()=>{
        project.firstElementChild.style.top='2rem';
    });

    project.addEventListener('click',()=>{

    })
});

//section 4
const formHeading = document.querySelector(".form-heading")
const formInputs= document.querySelectorAll(".contact-form-input");

formInputs.forEach(input=>{
    input.addEventListener("focus",()=>{
        formHeading.style.opacity="0"
        setTimeout(()=>{
            formHeading.textContent =`Your ${input.placeholder}`;
            formHeading.style.opacity="1"
        },300);
    });
    input.addEventListener("blur",()=>{
        formHeading.style.opacity="0"
        setTimeout(()=>{
            formHeading.textContent ="Let's Talk";
            formHeading.style.opacity="1"
        },300);
    });
});

 // Form
 const form=document.querySelector(".contact-form");
 const username=document.getElementById("name");
const email=document.getElementById("email");
const subject=document.getElementById("subject");
const message=document.getElementById("message");
const messages=document.querySelectorAll(".message");

const error=(input,message)=>{
    input.nextElementSibling.classList.add("error");
    input.nextElementSibling.textContent=message;
};

const success =(input)=>{
    input.nextElementSibling.classList.remove("error");
};
const checkInput =(inputArr)=>{
inputArr.forEach((input)=>{
    if(input.value.trim()===""){
        error(input,`${input.id} is required`);
    }else{
        success(input);
    }
});
};

const checkLength=(input,min)=>{
 if(input.value.trim().length<min){
    error(input,`${input.id} must be atleast ${min} characters`);
}
};

const checkEmail=(input)=>{
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(input.value.match(regex)){
        success(input);
    }else{
        error(input,"Email is not valid")
    }
}

 form.addEventListener("submit",(e)=>{
    checkInput([username,email,subject,message]);
      checkLength(username,2); 
     checkLength(subject,2); 
     checkLength(message,10);
  checkEmail(email); 
  

const notValid=Array.from(messages).find((message)=>{
    return message.classList.contains("error")
});
 notValid && e.preventDefault();
 });