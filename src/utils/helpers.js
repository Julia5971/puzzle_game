/**
 * 유틸리티 함수들
 */

/**
 * 랜덤한 색상 반환
 * @returns {string} 색상 클래스명
 */
export function getRandomColor() {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * 두 블록이 인접한지 확인
 * @param {Object} pos1 - 첫 번째 위치 {row, col}
 * @param {Object} pos2 - 두 번째 위치 {row, col}
 * @returns {boolean} 인접 여부
 */
export function isAdjacent(pos1, pos2) {
    const rowDiff = Math.abs(pos1.row - pos2.row);
    const colDiff = Math.abs(pos1.col - pos2.col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

/**
 * 블록 교환 함수
 * @param {Block} block1 - 첫 번째 블록
 * @param {Block} block2 - 두 번째 블록
 */
export function swapBlocks(block1, block2) {
    // 위치 교환
    const tempRow = block1.row;
    const tempCol = block1.col;
    
    block1.updatePosition(block2.row, block2.col);
    block2.updatePosition(tempRow, tempCol);
}