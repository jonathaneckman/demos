import { BindingEngine, autoinject } from 'aurelia-framework';

@autoinject
export class DemoArray {

  myCollection: Array<string> = ["foo"];

  constructor(private bindingEngine: BindingEngine) {
    let subscription = this.bindingEngine.collectionObserver(this.myCollection)
      .subscribe(this.collectionChanged.bind(this));
  }

  collectionChanged(splices: Array<ICollectionObserverSplice<string>>) {
    for (var i = 0; i < splices.length; i++) {
      var splice: ICollectionObserverSplice<string> = splices[i];

      // Output the values that were added.
      var valuesAdded = this.myCollection.slice(splice.index, splice.index + splice.addedCount);
      if (valuesAdded.length > 0) {
        console.log(`The following values were inserted at ${splice.index}: ${JSON.stringify(valuesAdded)}`);
      }

      // Output the values that were removed.
      if (splice.removed.length > 0) {
        console.log(`The following values were removed from ${splice.index}: ${JSON.stringify(splice.removed)}`);
      }
    }
  }

  addItems() {
    var nextIndex = this.myCollection.length;
    this.myCollection.push(`hello #${nextIndex++}`, `world #${nextIndex++}`);
  }

  removeItems() {
    this.myCollection.splice(1, 2);
  }
}
