function createSlider(target, viewCount, gap, transitionTime, autoPlay){
    target.classList.add('sbs-slider-container');
    // const viewCount = 2;
    // const gap = 8;
    // const transitionTime = 300;

    const contentsWrapper = document.createElement('div');
    contentsWrapper.classList.add('sbs-content-wrapper');
    
    
    const slider = document.createElement('div');
    slider.classList.add('sbs-slider');
    

    while(target.childElementCount !== 0) {
        target.firstElementChild.classList.add('sbs-content')
        contentsWrapper.appendChild(target.firstElementChild)
    }

    const slideCount = contentsWrapper.childElementCount;

    target.appendChild(slider)
    slider.appendChild(contentsWrapper);
        // 아래와 같은 모양이 된다.
        // div.slider-container > div.sllider > div.contents-wrapper

    const controls = document.createElement('div');
    controls.classList.add('sbs-controls');

    const prevButton = document.createElement('button');        
    const nextButton = document.createElement('button');    
    
    prevButton.classList.add('sbs-prev');
    nextButton.classList.add('sbs-next');

    prevButton.innerText = '이전';
    nextButton.innerText = '다음'
    const buttons = document.createElement('div');
    buttons.classList.add('sbs-buttons');

    controls.appendChild(prevButton)
    controls.appendChild(nextButton)
    controls.appendChild(buttons);

    target.appendChild(controls);






    

    const contentWidth = (slider.clientWidth - gap * (viewCount - 1)) / viewCount


    for(let i = 0 ; i < slideCount ; i ++ ){
        const button = document.createElement('div');
        button.classList.add('sbs-radio-button');
        button.addEventListener('click',()=>{
            index = viewCount + i;
            applyIndexToSlider(true)
        })

        buttons.appendChild(button);
    }

    buttons.children[0].classList.add('sbs-active');

    const cloneFirst = [];
    const cloneLast = [];

    for(let i = 0 ; i < viewCount ; i ++) {
        cloneFirst.push(contentsWrapper.children[i].cloneNode(true))
        cloneLast.push(contentsWrapper.children[contentsWrapper.childElementCount - 1 - i].cloneNode(true))
    }

    for(let i = 0 ; i < viewCount ; i ++) {
        contentsWrapper.appendChild(cloneFirst[i])
        contentsWrapper.insertBefore(cloneLast[i], contentsWrapper.firstElementChild)
    }

    // for(let i = 0 ; i < ??? ; ++) {
    //     contentsWrapper.appendChild(cloneFirst);
    //     contentsWrapper.insertBefore(cloneLast, contentsWrapper.firstElementChild);
    // }

    let index = viewCount ;
    let playAble = true;
    let autoPlayInterval;

    applyIndexToSlider(false);
    
    contentsWrapper.style.gap = `${gap}px`

    for(let i = 0 ; i < contentsWrapper.childElementCount ; i ++) {
        contentsWrapper.children[i].style.width = `${contentWidth}px`
    }


    nextButton.addEventListener('click', next);
    prevButton.addEventListener('click',()=>{
        if(playAble){
            playAble=false;

            index--;
            applyIndexToSlider(true)

            setTimeout(() => {
                playAble=true;

                if(index === viewCount - 1) {
                    // transtion 지속시간만큼 시간이 흐른 뒤에
                    // transtion을 0으로 만들고, 좌표를 첫번째 슬라이드로 바꿔치기한다
                    index = contentsWrapper.childElementCount - viewCount - 1
                    applyIndexToSlider(false) 
                }
            }, transitionTime);

    }})

    
    


    function next(){
        if(playAble){
            playAble=false;

            index++;
            applyIndexToSlider(true)

            setTimeout(() => {
                playAble=true;

                if(index === contentsWrapper.childElementCount-viewCount) {
                    // transtion 지속시간만큼 시간이 흐른 뒤에
                    // transtion을 0으로 만들고, 좌표를 첫번째 슬라이드로 바꿔치기한다
                    index = viewCount
                    applyIndexToSlider(false) 
                }
            }, transitionTime);
            
            // setTimeout(() => {
            //     playAble=true;
            //     console.log(playAble)
            // }, transitionTime);

            // // 만약 마지막 슬라이드(복사본)에 도달 했다면
            // if(index === contentsWrapper.childElementCount-viewCount) {
            //     // transtion 지속시간만큼 시간이 흐른 뒤에
            //     // transtion을 0으로 만들고, 좌표를 첫번째 슬라이드로 바꿔치기한다
            //     setTimeout(() => {
            //         index = viewCount
            //         applyIndexToSlider(false)

            //     }, transitionTime);
            // }
            

            // 만약 마지막 슬라이드(복사본)에 도달 했다면

        }
    }

    function applyIndexToSlider(animation){
        if(animation) {
            contentsWrapper.style.transition = `${transitionTime}ms`
        }else {
            contentsWrapper.style.transition = `none`
        }
        
        contentsWrapper.style.transform = `translateX(${index * -(contentWidth + gap)}px)`

        resetButtons();
        if(viewCount-1 === index){
            buttons.lastElementChild.classList.add('sbs-active');
        }else if(slideCount + viewCount === index) {
            buttons.firstElementChild.classList.add('sbs-active');
        }else {
            buttons.children[index-viewCount].classList.add('sbs-active');
        }

        if(autoPlay) {
            clearInterval(autoPlayInterval);
            
            autoPlayInterval = setInterval(() => {
                next();
            }, 4500);
        }
    }

    function resetButtons() {
        for(let i = 0 ; i < buttons.childElementCount ; i ++) {
            buttons.children[i].classList.remove('sbs-active');
        }
    }
}