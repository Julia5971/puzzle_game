/**
 * 메인 게임 로직
 */
import { GameBoard } from './components/GameBoard.js';

class Game {
    constructor() {
        this.gameBoard = new GameBoard();
    }

    /**
     * 게임 초기화
     */
    initialize() {
        // 게임 보드 초기화
        const boardElement = document.getElementById('gameBoard');
        console.log('boardElement:', boardElement);
        
        if (boardElement) {
            // 기존 내용 완전히 제거
            boardElement.innerHTML = '';
            
            // 새로운 게임 보드 생성 및 추가
            const newBoardElement = this.gameBoard.initialize();
            console.log('newBoardElement:', newBoardElement);
            console.log('newBoardElement children:', newBoardElement.children.length);
            
            boardElement.appendChild(newBoardElement);
            
            console.log('boardElement after append:', boardElement);
            console.log('boardElement children:', boardElement.children.length);
        }

        console.log('나오미 퍼즐 게임이 초기화되었습니다!');
        console.log('9×9 게임 보드가 생성되었습니다.');
    }
}

// 게임 인스턴스 생성 및 초기화
const game = new Game();
game.initialize();
