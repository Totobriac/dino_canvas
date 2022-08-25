function getZone(x, y) {
  var tX = Math.floor(x / 64);
  var tY = Math.floor(y / 64);


  if (tX < 4) {
    if (tY < 10) {
      return 0
    } else if (tY < 21) {
      return 5
    } else {
      return 9
    }
  } else if (tX < 7) {
    if (tY < 10) {
      return 1
    } else if (tY < 21) {
      return 5
    } else {
      return 9
    }
  } else if (tX < 12) {
    if (tY < 10) {
      return 2
    } else if (tY < 21) {
      return 5
    } else {
      return 9
    }
  } else if (tX < 15) {
    if (tY < 8) {
      return 3
    } else if (tY < 18) {
      return 6
    } else if (tY < 31) {
      return 10
    } else {
      return 9
    }
  } else if (tX < 19) {
    if (tY < 8) {
      return 3
    } else if (tY < 20) {
      return 6
    } else {
      return 10
    }
  } else if (tX < 21) {
    if (tY < 8) {
      return 3
    } else if (tY < 18) {
      return 6
    } else if (tY < 21) {
      return 7
    } else if (tY < 29) {
      return 10
    } else if (tY < 37) {
      return 11
    } else {
      return 3
    }
  } else if (tX < 24) {
    if (tY < 11) {
      return 3
    } else if (tY < 27) {
      return 7
    }
    else if (tY < 37) {
      return 11
    } else {
      return 3
    }
  } else if (tX < 28) {
    if (tY < 8) {
      return 3
    } else if (tY < 16) {
      return 8
    }
    else if (tY < 36) {
      return 11
    } else {
      return 3
    }
  } else if (tX < 29) {
    if (tY < 8) {
      return 4
    } else if (tY < 16) {
      return 8
    }
    else if (tY < 36) {
      return 11
    } else {
      return 3
    }
  } else {
    if (tY < 17) {
      return 4
    } else if (tY < 37) {
      return 11
    } else {
      return 3
    }
  }
}
function getTextNb(x, y) {

  var zone = getZone(x, y);

  switch (zone) {
    case 0:
    case 1:
    case 4:
      return [0, 3]
    case 4:
    case 6:
      return [2, 2]
    case 8:
      return [13, 11]
    case 10:
      return [1, 2]
    case 12:
    case 14:
      return [1, 1]
    case 3:
    case 2:
      return [4, 11]
    case 5:
      return [1, 12]
    case 7:
      return [1, 11]
    case 9:
      return [5, 1]
    case 11:
      return [2, 2]
    case 13:
      return [10, 10]
    case 15:
      return [1, 1]
  }


}

export { getTextNb }