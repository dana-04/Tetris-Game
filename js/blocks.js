const BLOCKS = {
    tree: [
        //tree has 4 different shapes
        [[2,1],[0,1],[1,0],[1,1]],
        [[1,2],[0,1],[1,0],[1,1]],
        [[1,2],[0,1],[2,1],[1,1]],
        [[2,1],[1,2],[1,0],[1,1]],
    ],

    square: [
        
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
    ],

    bar: [
        
        [[1,0],[2,0],[3,0],[4,0]],
        [[2,-1],[2,0],[2,1],[2,2]],
        [[1,0],[2,0],[3,0],[4,0]],
        [[2,-1],[2,0],[2,1],[2,2]],
    ],

    zzz: [
        
        [[0,0],[1,0],[1,1],[2,1]],
        [[0,1],[1,0],[1,1],[0,2]],
        [[0,1],[1,1],[1,2],[2,2]],
        [[2,0],[2,1],[1,1],[1,2]],
    ],

    elleft: [
        
        [[0,0],[0,1],[1,1],[2,1]],
        [[1,0],[1,1],[1,2],[0,2]],
        [[0,1],[1,1],[2,1],[2,2]],
        [[1,0],[2,0],[1,1],[1,2]],
    ],

    elright: [
        
        [[1,0],[2,0],[1,1],[1,2]],
        [[0,0],[0,1],[1,1],[2,1]],
        [[0,2],[1,0],[1,1],[1,2]],
        [[0,1],[1,1],[2,1],[2,2]],
    ],
    
}

export default BLOCKS;