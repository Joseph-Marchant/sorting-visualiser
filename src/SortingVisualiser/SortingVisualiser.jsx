import React from 'react';
import './SortingVisualiser.css';
import * as sortingFunctions from '../SortingFunctions/SortingFunctions.js'

export default class SortingVisualiser extends React.Component {
    constructor(props)  {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.newArray(250);
    };

    makeNewArray() {
        let size = document.getElementsByClassName("array-size");
        size = size[0].value;
        if (size > 250) {
            size = 250;
        } else if (size < 1) {
            size = 2;
        }
        this.newArray(size);
    }

    newArray(size) {
        const array = [];
        for (let i = 0; i < size; i++) {
            const int = randomInt(5, 1000)
            array.push((int / 1000) * 80);
        }
        this.setState({array});
        const bars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < bars.length; i++) {
            bars[i].style.backgroundColor = "lightblue";
        }
    }

    mergeSort() {
        const animations = sortingFunctions.mergeSort(this.state.array);
        const bars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < animations.length; i++) {
            const changeColor = i % 3 !== 2;
            if (changeColor) {
                const [oneIdx, twoIdx] = animations[i];
                const color = i % 3 === 0 ? "red" : "lightblue";
                setTimeout(() => {
                    bars[oneIdx].style.backgroundColor = color;
                    bars[twoIdx].style.backgroundColor = color;
                }, i * 3);
            } else {
                setTimeout(() => {
                    const [oneIdx, newHeight] = animations[i];
                    bars[oneIdx].style.height = `${newHeight}vh`;
                }, i * 3);
            }
        }
        setTimeout(() => {
            this.endAnimation(bars);
        }, animations.length * 3)
    }

    quickSort() {
        const animations = sortingFunctions.quickSort(this.state.array);
        const bars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < animations.length; i++) {
            const animation = animations[i];
            const changeColor = animation[0], red = animation[1];
            const barOne = bars[animation[2]], barTwo = bars[animation[3]];
            const oneStyle = barOne.style, twoStyle = barTwo.style;
            if (changeColor) {
                const barThree = bars[animation[4]];
                const threeStyle = barThree.style;
                if (red) {
                    setTimeout(() => {
                        oneStyle.backgroundColor = "red";
                        twoStyle.backgroundColor = "purple";
                        threeStyle.backgroundColor = "red";
                    }, i * 3); 
                } else {    
                    setTimeout(() => {
                        oneStyle.backgroundColor = "lightblue";
                        twoStyle.backgroundColor = "lightblue";
                        threeStyle.backgroundColor = "lightblue";
                    }, i * 3);  
                }               
            } else {

                setTimeout(() => {
                    const oneNewHeight = twoStyle.height, twoNewHeight = oneStyle.height;
                    oneStyle.height = oneNewHeight;
                    twoStyle.height = twoNewHeight;
                }, i * 3);
            }
        }
        setTimeout(() => {
            this.endAnimation(bars);
        }, animations.length * 3)
    }

    selectionSort() {
        const animations = sortingFunctions.selectionSort(this.state.array);
        const bars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < animations.length; i++) {
            const [oneIdx, twoIdx, changeColor, red] = animations[i]
            const barOne = bars[oneIdx], barTwo = bars[twoIdx];
            let color = "lightblue";
            if (red) {
                color = "red";
            } else if (!red && !changeColor) {
                color = "lightgreen";
            }
            if (changeColor) {
                setTimeout(() => {
                    barOne.style.backgroundColor = color;
                    barTwo.style.backgroundColor = color;
                }, i * 3);               
            } else {
                setTimeout(() => {
                    const oneNewHeight = barTwo.style.height, twoNewHeight = barOne.style.height;
                    barOne.style.height = oneNewHeight;
                    barTwo.style.height = twoNewHeight;
                    barTwo.style.backgroundColor = color;
                }, i * 3);
            }
        }
    }

    bubbleSort() {
        const animations = sortingFunctions.bubbleSort(this.state.array);
        const bars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < animations.length; i++) {
            if (animations[i].length === 1) {
                setTimeout(() => {
                    const bar = bars[animations[i][0]];
                    bar.style.backgroundColor = "lightgreen";
                }, i * 3);
                
            } else {
                const [oneIdx, twoIdx, changeColor, red] = animations[i]
                const barOne = bars[oneIdx], barTwo = bars[twoIdx];
                let color = "lightblue";
                if (red) {
                    color = "red";
                }
                if (changeColor) {
                    setTimeout(() => {
                        barOne.style.backgroundColor = color;
                        barTwo.style.backgroundColor = color;
                    }, i * 3);               
                } else {
                    setTimeout(() => {
                        const oneNewHeight = barTwo.style.height, twoNewHeight = barOne.style.height;
                        barOne.style.height = oneNewHeight;
                        barTwo.style.height = twoNewHeight;
                    }, i * 3);
                }
            }
        }
    }

    insertionSort() {
        const animations = sortingFunctions.insertionSort(this.state.array);
        const bars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < animations.length; i++) {
            const [oneIdx, twoIdx, changeColor, red] = animations[i]
            const barOne = bars[oneIdx], barTwo = bars[twoIdx];
            let color = "lightblue";
            if (red) {
                color = "red";
            } else if (!red && !changeColor) {
                color = "lightgreen";
            }
            if (changeColor) {
                setTimeout(() => {
                    barOne.style.backgroundColor = color;
                    barTwo.style.backgroundColor = color;
                }, i * 3);               
            } else {
                setTimeout(() => {
                    const oneNewHeight = barTwo.style.height, twoNewHeight = barOne.style.height;
                    barOne.style.height = oneNewHeight;
                    barTwo.style.height = twoNewHeight;
                }, i * 3);
            }
        }
        setTimeout(() => {
            this.endAnimation(bars);
        }, animations.length * 3)
    }  

    endAnimation(bars) {
        for (let i = 0; i < bars.length; i++) {
            const bar = bars[i];
            setTimeout(() => {
                bar.style.backgroundColor = "lightgreen";
            }, i * 3);
        }
    }

    // Test function only works when returning the array rather than the animations
    // testFunctions() {
    //     for (let i = 0; i < 100; i++) {
    //         const array = [];
    //         for (let i = 0; i < randomInt(1, 1000); i++) {
    //             array.push(randomInt(-1000, 1000));
    //         }
    //         const sortedTestArray = array.slice().sort((a, b) => a - b);
    //         const sortedArray = sortingFunctions.insertionSort(array.slice());
    //         console.log(testSort(sortedTestArray, sortedArray));
    //     }
    // }

    render() {
        const {array} = this.state
        const length = array.length
        return (
            <div className="page-container" style={{width: `${window.innerWidth}px`}}>
                <div className="interaction-bar" style={{width: `${window.innerWidth}px`}}>
                    <div className="button-divider"></div>
                    <label className="array-size-label" for="array-size">Array Size (max 250)</label>
                    <input className="array-size" type="number" max="250" defaultValue={250}></input>
                    <div className="button-divider"></div>
                    <button className="interaction-button" onClick={() => this.makeNewArray()}>New Array</button>
                    <div className="button-divider"></div>
                    <button className="interaction-button" onClick={() => this.mergeSort()}>Merge Sort</button>
                    <div className="button-divider"></div>
                    <button className="interaction-button" onClick={() => this.quickSort()}>Quick Sort</button>
                    <div className="button-divider"></div>
                    <button className="interaction-button" onClick={() => this.selectionSort()}>Selection Sort</button>
                    <div className="button-divider"></div>
                    <button className="interaction-button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <div className="button-divider"></div>
                    <button className="interaction-button" onClick={() => this.insertionSort()}>Insertion Sort</button>
                    <div className="button-divider"></div>
                    {/* <button className="interaction-button" onClick={() => this.testFunctions()}>Test</button>
                    <div className="button-divider"></div> */}
                </div>
                <div className="array-container" style={{width: `${window.innerWidth * 0.95}px`}}>
                    {array.map((value, idx) => (
                        <div className="array-bar" key={idx} style={{height: `${value}vh`, width: `${((((window.innerWidth * 0.95) - 20 - (length * 2)) / length))}px`}}></div>
                    ))}
                </div>
                <div className="credit">Created by Joseph Marchant. GitHub can be found <a href="https://github.com/Joseph-Marchant?tab=repositories">here.</a></div>
            </div>
        );
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// function testSort(sortedTestArray, sortedArray) {
//     if (sortedTestArray.length !== sortedArray.length) return false;
//     for (let i = 0; i < sortedTestArray.length; i++) {
//         if (sortedTestArray[i] !== sortedArray[i]) return false;
//     }
//     return true;
// }