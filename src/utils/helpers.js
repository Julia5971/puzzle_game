/**
 * 블록 컴포넌트
 */
import { getRandomColor, createElement } from '../utils/helpers.js';

export class Block {
    constructor(row, col, color = null) {
        this.row = row;
        this.col = col;
        this.color = color || getRandomColor();
        this.element = null;
        this.isSelected = false;
    }

    /**
     * 블록의 DOM 요소 생성
     * @returns {HTMLElement} 블록 요소
     */
    createElement() {
        this.element = createElement('div', `block ${this.color}`);
        this.element.dataset.row = this.row;
        this.element.dataset.col = this.col;
        return this.element;
    }

    /**
     * 블록 선택 상태 토글
     */
    toggleSelection() {
        this.isSelected = !this.isSelected;
        if (this.element) {
            this.element.classList.toggle('selected', this.isSelected);
        }
    }
}
