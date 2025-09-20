/**
 * 블록 컴포넌트
 */
import { getRandomColor } from '../utils/helpers.js';

/**
 * DOM 요소 생성 헬퍼
 * @param {string} tag - HTML 태그
 * @param {string} className - CSS 클래스명
 * @param {string} text - 텍스트 내용
 * @returns {HTMLElement} 생성된 요소
 */
function createElement(tag, className = '', text = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
}

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

    /**
     * 블록 위치 업데이트
     * @param {number} newRow - 새로운 행
     * @param {number} newCol - 새로운 열
     */
    updatePosition(newRow, newCol) {
        this.row = newRow;
        this.col = newCol;
        if (this.element) {
            this.element.dataset.row = newRow;
            this.element.dataset.col = newCol;
        }
    }
}