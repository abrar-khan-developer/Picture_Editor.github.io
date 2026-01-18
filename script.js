let filters = {
    Brightness: {
        value: 100,
        min : 0,
        max : 200,
        unit : "%"
    },
    Contrast: {
        value: 100,
        min : 0,
        max : 200,
        unit : "%"
    },
    // exposure: {
    //     value: 100,
    //     min : 0,
    //     max : 200,
    //     unit : "%"
    // },
    Saturation: {
        value: 100,
        min : 0,
        max : 100,
        unit : "%"
    },
    HueRotation: {
        value: 0,
        min : 0,
        max : 90,
        unit : "deg"
    },
    blur: {
        value: 0,
        min : 0,
        max : 20,
        unit : "px"
    },
    grayscale: {
        value: 0,
        min : 0,
        max : 100,
        unit : "%"
    },
    sepia : {
        value: 0,
        min : 0,
        max : 100,
        unit : "%"
    }, 
    opacity :{
        value: 100,
        min : 0,
        max : 100,
        unit : "%"
    }, 
    invert:{
        value: 0,
        min : 0,
        max : 100,
        unit : "%"
    },
    
}

let profileDiv = document.querySelector('.placeholder')
let imageCanvas = document.querySelector('#image-canvas')

const imageInput =  document.querySelector('#image-input')
const canvasCtx = imageCanvas.getContext("2d");   

const filtersRoot = document.querySelector('.filters')

const resetBtn = document.getElementById('reset-btn')
const downladBtn = document.getElementById('download-btn')

const presetsContainer = document.querySelector('.presets')
// console.log(presetsContainer)

let file = null;
let image = null

function createFilter(name , unit = "%",value , min, max){
    let div = document.createElement("div")
    div.classList.add("filter")

    let input = document.createElement('input')
    input.type = 'range'
    input.value = value
    input.min = min
    input.max = max
    input.id = name

    input.addEventListener('input', (e) => {
        filters[name].value = e.target.value
        // console.log(filters[name].value,filters[name].unit)
        imageEffect()
    })
    const p = document.createElement('p')
    p.innerHTML = name

    div.appendChild(p)
    div.appendChild(input)

    return div
}


function addInputInFiltersDiv(){
        Object.keys(filters).forEach( (key) => {
        let elem = createFilter(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max);

        filtersRoot.appendChild(elem)
    })
}
addInputInFiltersDiv()

imageInput.addEventListener('change',(e)=> {
    file = e.target.files[0]
    profileDiv = document.querySelector('.placeholder')
    profileDiv.style.display = 'none'

    const img = new Image()
    img.src = URL.createObjectURL(file)
    // let url = URL.createObjectURL(file)
    img.onload = () => {
        imageCanvas.style.display = 'block'
        image = img
        imageCanvas.width = img.width
        imageCanvas.height = img.height
        canvasCtx.drawImage(img , 0,0)
    }

})

function imageEffect(){

    if(!image) return

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    canvasCtx.filter = `
        brightness(${filters.Brightness.value}${filters.Brightness.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        contrast(${filters.Contrast.value}${filters.Contrast.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
        invert(${filters.invert.value}${filters.invert.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
         grayscale(${filters.grayscale.value}${filters.grayscale.unit})
        saturate(${filters.Saturation.value}${filters.Saturation.unit})
        `
    canvasCtx.drawImage(image , 0,0)
}

resetBtn.addEventListener('click' , () => {
    // console.log(' click btn')
    filtersRoot.innerHTML = ''
    filters = {
    Brightness: {
        value: 100,
        min : 0,
        max : 200,
        unit : "%"
    },
    Contrast: {
        value: 100,
        min : 0,
        max : 200,
        unit : "%"
    },
    // exposure: {
    //     value: 100,
    //     min : 0,
    //     max : 200,
    //     unit : "%"
    // },
    Saturation: {
        value: 100,
        min : 0,
        max : 100,
        unit : "%"
    },
    HueRotation: {
        value: 0,
        min : 0,
        max : 90,
        unit : "deg"
    },
    blur: {
        value: 0,
        min : 0,
        max : 20,
        unit : "px"
    },
    grayscale: {
        value: 0,
        min : 0,
        max : 100,
        unit : "%"
    },
    sepia : {
        value: 0,
        min : 0,
        max : 100,
        unit : "%"
    }, 
    opacity :{
        value: 100,
        min : 0,
        max : 100,
        unit : "%"
    }, 
    invert:{
        value: 0,
        min : 0,
        max : 100,
        unit : "%"
    },
    
    }
    imageEffect()
    addInputInFiltersDiv()
    // console.log(' click btn end')
})
 
// hue-rotate(${filters.HueRotation.value}${filters.HueRotation.unit})

downladBtn.addEventListener('click' , () => {
    let link = document.createElement('a')
    link.download = 'Edit_Picture.png'
    link.href = imageCanvas.toDataURL()
    link.click()

})

let presets = {
  normal: {
    Brightness: 100,
    Contrast: 100,
    Saturation: 100,
    HueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  drama: {
    Brightness: 110,
    Contrast: 150,
    Saturation: 120,
    HueRotation: 5,
    blur: 0,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  vintage: {
    Brightness: 105,
    Contrast: 90,
    Saturation: 70,
    HueRotation: 10,
    blur: 1,
    grayscale: 10,
    sepia: 40,
    opacity: 100,
    invert: 0,
  },

  oldSchool: {
    Brightness: 95,
    Contrast: 80,
    Saturation: 60,
    HueRotation: 0,
    blur: 1,
    grayscale: 20,
    sepia: 60,
    opacity: 100,
    invert: 0,
  },

  blackAndWhite: {
    Brightness: 100,
    Contrast: 120,
    Saturation: 0,
    HueRotation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  cinematic: {
    Brightness: 105,
    Contrast: 140,
    Saturation: 90,
    HueRotation: 350,
    blur: 0,
    grayscale: 0,
    sepia: 5,
    opacity: 100,
    invert: 0,
  },

  fade: {
    Brightness: 110,
    Contrast: 85,
    Saturation: 80,
    HueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 15,
    opacity: 90,
    invert: 0,
  },

  invertColors: {
    Brightness: 100,
    Contrast: 100,
    Saturation: 100,
    HueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 100,
  },
};


Object.keys(presets).forEach( (presetName) => {
    const presetsButton = document.createElement("button")
    presetsButton.classList.add("btn")
    presetsButton.innerText = presetName
    presetsContainer.appendChild(presetsButton)

    presetsButton.addEventListener('click' , () => {
        const preset = presets[presetName]

        Object.keys(preset).forEach( (filterName) => {
            filters[filterName].value = preset[filterName]
        })
        imageEffect()
        filtersRoot.innerHTML = ''
        addInputInFiltersDiv()
    })
})