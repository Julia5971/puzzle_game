/**
 * 게임 보드 컴포넌트
 */
import { Block } from './Block.js';
import { createElement } from '../utils/helpers.js';

export class GameBoard {
    constructor(rows = 9, cols = 9) {
        this.rows = rows;
        this.cols = cols;
        this.blocks = [];
        this.element = null;
    }

    /**
     * 게임 보드 초기화
     * @returns {HTMLElement} 보드 요소
     */
    initialize() {
        this.element = createElement('div', 'game-board');
        this.createBlocks();
        this.render();
        return this.element;
    }

    /**
     * 블록들 생성
     */
    createBlocks() {
        this.blocks = [];
        for (let row = 0; row < this.rows; row++) {
            this.blocks[row] = [];
            for (let col = 0; col < this.cols; col++) {
                this.blocks[row][col] = new Block(row, col);
            }
        }
    }

    /**
     * 보드 렌더링
     */
    render() {
        this.element.innerHTML = '';
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const blockElement = this.blocks[row][col].createElement();
                this.element.appendChild(blockElement);
            }
        }
    }
}
