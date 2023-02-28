function solution(board) {
  // 이동(4방향), 회전(4방향)
  // 회전을 하면 가로에서 세로로, 세로에서 가로로 변경
  let wheel = [[0,0], [0,1]]
  let direction = 'row'
  let moveDir1 = ['left', 'right', 'top', 'bottom'] 
  let moveDir2 = ['leftBottom', 'leftTop', 'rightBottom', 'rightTop']
  let answer = 0 

  let width = board.length 
  let height = board[0].length
  let ch = new Array(height).fill(null).map((_) => new Array(width).fill(0))

  let translate = {
    left: (wheel, direction, board) => {
      if(direction == 'row'){
        wheel.sort((a,b) => a[1] - b[1])
        if(board[wheel[0][0]][wheel[0][1] - 1] !== 1){
          wheel[0][1]--
          wheel[1][1]--    
        }
      }
      if(direction == 'col'){
        wheel.sort((a,b) => a[0] - b[0])
        if(board[wheel[0][0]][wheel[0][1] - 1] !== 1 && board[wheel[1][0]][wheel[1][1] - 1] !== 1){
          wheel[0][1]--
          wheel[1][1]--
        }
      }

      return [wheel, direction]
    }, 
    right: (wheel, direction, board) => { 
      wheel[0][1]++
      wheel[1][1]++
    },
    top: (wheel, direction, board) => { 
      wheel[0][0]--
      wheel[1][0]--
    },
    bottom: (wheel, direction, board) => {
      wheel[0][0]++
      wheel[1][0]++
    }
  }

  let rotate = {
    leftBottom: (direction, wheel, board) => {
      if(direction == 'row'){
        wheel.sort((a,b) => a[1] - b[1])
        if(board[wheel[0][0] + 1][wheel[0][1] + 1] !== 1){
          wheel[1][0]++
          wheel[1][1]--
        }
      }
      if(direction == 'col'){
        wheel.sort((a,b) => a[0] - b[0])
        if(board[wheel[0][0]][wheel[0][1] - 1] !== 1){
          wheel[0][0]++
          wheel[0][1]--
        }
      }

      return [wheel, direction]
    },
    leftTop: (direction, wheel, board) => {
      if(direction == 'row'){
        wheel.sort((a,b) => a[1] - b[1])
        if(board[wheel[0][0] - 1][wheel[0][1] + 1] !== 1){
          wheel[1][0]--
          wheel[1][1]--
        }
      }
      if(direction == 'col'){
        wheel.sort((a,b) => a[0] - b[0])
        if(board[wheel[0][0] + 1][wheel[0][1] - 1] !== 1){
          wheel[1][0]--
          wheel[1][1]++
        }
      }

      return [wheel, direction]
    },
    rightBottom: (direction, wheel, board) => {
      if(direction == 'row'){
        wheel.sort((a,b) => a[1] - b[1])
        if(board[wheel[0][0] + 1][wheel[0][1]] !== 1){
          wheel[0][0]++
          wheel[0][1]++
        }
      }
      if(direction == 'col'){
        wheel.sort((a,b) => a[0] - b[0])
        if(board[wheel[0][0]][wheel[0][1] + 1] !== 1){
          wheel[0][0]++
          wheel[0][1]++
        }
      }

      return [wheel, direction]
    },
    rightTop: (direction, wheel, board) => {
      if(direction == 'row'){
        wheel.sort((a,b) => a[1] - b[1])
        if(board[wheel[0][0] - 1][wheel[0][1]] !== 1){
          wheel[0][0]--
          wheel[0][1]++
        }
      }
      if(direction == 'col'){
        wheel.sort((a,b) => a[0] - b[0])
        if(board[wheel[0][0] + 1][wheel[0][1] + 1] !== 1){
          wheel[1][0]--
          wheel[1][1]++
        }
      }

      return [wheel, direction]
    }
  }

  function dfs(temp = [[0,0], [0,1]], direction = 'row'){
    if(9999){}

    for(let i=0; i<moveDir1.length; i++){
      dfs(translate[moveDir1[i]](temp, board)[0], translate[moveDir1[i]](temp, board)[1])
    }
  }
  dfs()
  
}

console.log(
  solution([
    [0, 0, 0, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1],
    [1, 1, 0, 0, 1],
    [0, 0, 0, 0, 0],
  ])
); // 7
