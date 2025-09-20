/**
 * 게임 보드 컴포넌트
 */
import { Block } from './Block.js';
import { isAdjacent, swapBlocks } from '../utils/helpers.js';

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

export class GameBoard {
    constructor(rows = 9, cols = 9) {
        this.rows = rows;
        this.cols = cols;
        this.blocks = [];
        this.element = null;
        this.selectedBlock = null;
    }

    /**
     * 게임 보드 초기화
     * @returns {HTMLElement} 보드 요소
     */
    initialize() {
        // game-board 클래스 없이 생성 (HTML에서 이미 적용됨)
        this.element = createElement('div', 'board-content');
        this.createBlocks();
        this.render();
        this.attachEventListeners();
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

    /**
     * 이벤트 리스너 연결
     */
    attachEventListeners() {
        this.element.addEventListener('click', (e) => {
            if (e.target.classList.contains('block')) {
                const row = parseInt(e.target.dataset.row);
                const col = parseInt(e.target.dataset.col);
                this.handleBlockClick(row, col);
            }
        });
    }

    /**
     * 블록 클릭 처리
     * @param {number} row - 행
     * @param {number} col - 열
     */
    handleBlockClick(row, col) {
        const clickedBlock = this.blocks[row][col];
        
        if (this.selectedBlock === null) {
            // 첫 번째 블록 선택
            this.selectedBlock = clickedBlock;
            clickedBlock.toggleSelection();
            console.log(`블록 선택: (${row}, ${col}) - ${clickedBlock.color}`);
        } else if (this.selectedBlock === clickedBlock) {
            // 같은 블록 클릭 시 선택 해제
            clickedBlock.toggleSelection();
            this.selectedBlock = null;
            console.log('블록 선택 해제');
        } else {
            // 두 번째 블록 클릭 시 교환 시도
            this.attemptSwap(this.selectedBlock, clickedBlock);
        }
    }

    /**
     * 블록 교환 시도
     * @param {Block} block1 - 첫 번째 블록
     * @param {Block} block2 - 두 번째 블록
     */
    attemptSwap(block1, block2) {
        // 인접한 블록인지 확인
        if (isAdjacent(block1, block2)) {
            // 인접한 경우 교환
            this.swapBlocks(block1, block2);
            console.log(`블록 교환 성공: (${block1.row}, ${block1.col}) ↔ (${block2.row}, ${block2.col})`);
        } else {
            // 인접하지 않은 경우 교환 불가
            console.log('인접하지 않은 블록은 교환할 수 없습니다.');
        }
        
        // 선택 해제
        block1.toggleSelection();
        block2.toggleSelection();
        this.selectedBlock = null;
    }

    /**
     * 블록 교환 실행
     * @param {Block} block1 - 첫 번째 블록
     * @param {Block} block2 - 두 번째 블록
     */
    swapBlocks(block1, block2) {
        // 배열에서 위치 교환
        const tempBlock = this.blocks[block1.row][block1.col];
        this.blocks[block1.row][block1.col] = this.blocks[block2.row][block2.col];
        this.blocks[block2.row][block2.col] = tempBlock;
        
        // 블록 객체의 위치 업데이트
        swapBlocks(block1, block2);
        
        // 화면 다시 렌더링
        this.render();
    }
}