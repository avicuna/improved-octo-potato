import {Component, OnInit} from '@angular/core';
import {Helmet} from '../Helmet';
import {Armor} from '../Armor';
import {Weapon} from '../Weapon';
import {Token} from '../Token';
import {HelmetList, ArmorList, WeaponList} from '../LootTable';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {User} from '../User';

@Component({
  selector: 'app-loot',
  templateUrl: './loot.component.html',
  styleUrls: ['./loot.component.css']
})
export class LootComponent implements OnInit {
  helmet = new Helmet();
  armor = new Armor();
  weapon = new Weapon();
  tokens = 0;
  clickMessage = '';
  loot = 0;
  imgPath = '../../assets/treasureChest.png';
  // loottype = 0;
  // lootname = '';

  private userDoc: AngularFirestoreDocument<User>;
  user: Observable<User>;
  userManip;
  testinfo;

  constructor(private afs: AngularFirestore) {
    this.userDoc = afs.doc('users/' + localStorage.userid);
    this.user = this.userDoc.valueChanges();
    this.user.map(num => num).subscribe(x => this.userManip = x);
    this.user.map(num => num).subscribe(x => this.tokens = x.tokens);
  }

  lootRoll() {
    this.afs.collection('users').doc(localStorage.userid).set({'tokens': this.userManip.tokens - 1}, {merge: true});
    const lootType = this.randomInt(1, 3);
    if (lootType === 1) {
      this.rollHelm();
    } else if (lootType === 2) {
      this.rollArmor();
    } else if (lootType === 3) {
      this.rollWeapon();
    }
  }

  rollHelm() {
    const lootNum = this.randomInt(1, 100);
    if (lootNum > 50) {
      this.imgPath = '../../assets/helmetGreen.png';
      this.userManip.invHelm.push(this.imgPath);
      this.afs.collection('users').doc(localStorage.userid).set({'invHelm': this.userManip.invHelm}, {merge: true});
    } else if (lootNum <= 50 && lootNum > 20) {
      this.imgPath = '../../assets/helmetBlue.png';
      this.userManip.invHelm.push(this.imgPath);
      this.afs.collection('users').doc(localStorage.userid).set({'invHelm': this.userManip.invHelm}, {merge: true});
    } else if (lootNum <= 20 && lootNum > 5) {
      this.imgPath = '../../assets/helmetPurple.png';
      this.userManip.invHelm.push(this.imgPath);
      this.afs.collection('users').doc(localStorage.userid).set({'invHelm': this.userManip.invHelm}, {merge: true});
    } else if (lootNum <= 5) {
      this.imgPath = '../../assets/helmetYellow.png';
      this.userManip.invHelm.push(this.imgPath);
      this.afs.collection('users').doc(localStorage.userid).set({'invHelm': this.userManip.invHelm}, {merge: true});
    }
  }

  rollArmor() {
    const lootNum = this.randomInt(1, 100);
    if (lootNum > 50) {
      this.imgPath = '../../assets/armorGreen.png';
      this.userManip.invArmor.push(this.imgPath);
      this.afs.collection('users').doc(localStorage.userid).set({'invArmor': this.userManip.invArmor}, {merge: true});
    } else if (lootNum <= 50 && lootNum > 20) {
      this.imgPath = '../../assets/armorBlue.png';
      this.userManip.invArmor.push(this.imgPath);
      this.afs.collection('users').doc(localStorage.userid).set({'invArmor': this.userManip.invArmor}, {merge: true});
    } else if (lootNum <= 20 && lootNum > 5) {
      this.imgPath = '../../assets/armorPurple.png';
      this.userManip.invArmor.push(this.imgPath);
      this.afs.collection('users').doc(localStorage.userid).set({'invArmor': this.userManip.invArmor}, {merge: true});
    } else if (lootNum <= 5) {
      this.imgPath = '../../assets/armorYellow.png';
      this.userManip.invArmor.push(this.imgPath);
      this.afs.collection('users').doc(localStorage.userid).set({'invArmor': this.userManip.invArmor}, {merge: true});
    }
  }

  rollWeapon() {
    const lootNum = this.randomInt(1, 100);
    if (lootNum > 50) {
      this.imgPath = '../../assets/weaponGreen.png';
      this.userManip.invWeapon.push(this.imgPath);
      this.afs.collection('users').doc(localStorage.userid).set({'invWeapon': this.userManip.invWeapon}, {merge: true});
    } else if (lootNum <= 50 && lootNum > 20) {
      this.imgPath = '../../assets/weaponBlue.png';
      this.userManip.invWeapon.push(this.imgPath);
      this.afs.collection('users').doc(localStorage.userid).set({'invWeapon': this.userManip.invWeapon}, {merge: true});
    } else if (lootNum <= 20 && lootNum > 5) {
      this.imgPath = '../../assets/weaponPurple.png';
      this.userManip.invWeapon.push(this.imgPath);
      this.afs.collection('users').doc(localStorage.userid).set({'invWeapon': this.userManip.invWeapon}, {merge: true});
    } else if (lootNum <= 5) {
      this.imgPath = '../../assets/weaponYellow.png';
      this.userManip.invWeapon.push(this.imgPath);
      this.afs.collection('users').doc(localStorage.userid).set({'invWeapon': this.userManip.invWeapon}, {merge: true});
    }
  }

  /**
   * generate a random integer between min and max
   * @param {Number} min
   * @param {Number} max
   * @return {Number} random generated integer
   */
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

/*  lootrollarmor() {
    this.loot = this.randomInt(1, 100);
    if (this.loot <= 5) {
      for (let i = 0; i < ArmorList.length; i++) {
        if (ArmorList[i].id === 8) {
          this.armor = ArmorList[i];
          this.tokens.count = this.tokens.count - 1;
          return this.armor;
        }
      }
    }
    if (this.loot <= 20 && this.loot > 5) {
      for (let i = 0; i <= ArmorList.length; i++) {
        if (ArmorList[i].id === 7) {
          this.armor = ArmorList[i];
          this.tokens.count = this.tokens.count - 1;
          return this.armor;
        }
      }
    }
    if (this.loot <= 50 && this.loot > 20) {
      for (let i = 0; i <= ArmorList.length; i++) {
        if (ArmorList[i].id === 6) {
          this.armor = ArmorList[i];
          this.tokens.count = this.tokens.count - 1;
          return this.armor;
        }
      }
    }
    if (this.loot <= 100 && this.loot > 50) {
      for (let i = 0; i <= ArmorList.length; i++) {
        if (ArmorList[i].id === 5) {
          this.armor = ArmorList[i];
          this.tokens.count = this.tokens.count - 1;
          return this.armor;
        }
      }
    }
  }

  lootrollhelmet() {
    this.loot = this.randomInt(1, 100);
    if (this.loot <= 5) {
      for (let i = 0; i < HelmetList.length; i++) {
        if (HelmetList[i].id === 4) {
          this.helmet = HelmetList[i];
          this.tokens.count = this.tokens.count - 1;
          return this.helmet;
        }
      }
    }
    if (this.loot <= 20 && this.loot > 5) {
      for (let i = 0; i <= HelmetList.length; i++) {
        if (HelmetList[i].id === 3) {
          this.helmet = HelmetList[i];
          this.tokens.count = this.tokens.count - 1;
          return this.helmet;
        }
      }
    }
    if (this.loot <= 50 && this.loot > 20) {
      for (let i = 0; i <= HelmetList.length; i++) {
        if (HelmetList[i].id === 2) {
          this.helmet = HelmetList[i];
          this.tokens.count = this.tokens.count - 1;
          return this.helmet;
        }
      }
    }
    if (this.loot <= 100 && this.loot > 50) {
      for (let i = 0; i <= HelmetList.length; i++) {
        if (HelmetList[i].id === 1) {
          this.helmet = HelmetList[i];
          this.tokens.count = this.tokens.count - 1;
          return this.helmet;
        }
      }
    }
  }

  lootrollweapon() {
    this.loot = this.randomInt(1, 100);
    if (this.loot <= 5) {
      for (let i = 0; i < WeaponList.length; i++) {
        if (WeaponList[i].id === 12) {
          this.weapon = WeaponList[i];
          this.tokens.count = this.tokens.count - 1;
          return this.weapon;
        }
      }
    }
    if (this.loot <= 20 && this.loot > 5) {
      for (let i = 0; i <= WeaponList.length; i++) {
        if (WeaponList[i].id === 11) {
          this.weapon = WeaponList[i];
          this.tokens.count = this.tokens.count - 1;
          return this.weapon;
        }
      }
    }
    if (this.loot <= 50 && this.loot > 20) {
      for (let i = 0; i <= WeaponList.length; i++) {
        if (WeaponList[i].id === 10) {
          this.weapon = WeaponList[i];
          this.tokens.count = this.tokens.count - 1;
          return this.weapon;
        }
      }
    }
    if (this.loot <= 100 && this.loot > 50) {
      for (let i = 0; i <= WeaponList.length; i++) {
        if (WeaponList[i].id === 9) {
          this.weapon = WeaponList[i];
          this.tokens.count = this.tokens.count - 1;
          return this.weapon;
        }
      }
    }
  }


  onClickMe() {
    alert(this.userManip.tokens);
    this.clickMessage = 'Here\'s your loot';
    this.loottype = this.randomInt(1, 3);
    if (this.loottype === 1) {
      this.lootname = this.lootrollhelmet().name;
    }
    if (this.loottype === 2) {
      this.lootname = this.lootrollarmor().name;
    }
    if (this.loottype === 3) {
      this.lootname = this.lootrollweapon().name;
    }
  }*/


  ngOnInit() {
  }

}
