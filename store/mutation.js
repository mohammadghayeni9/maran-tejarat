export const mutations = {
    setItemForIndicator(state, value) {
        if (this.state.states.indicatorsAndItemsToBeSelected.find(item => item[0] == value.indicatorId)) {
            let index = this.state.states.indicatorsAndItemsToBeSelected.findIndex(
              (item) => item[0] == value.indicatorId
            );
            this.state.states.indicatorsAndItemsToBeSelected[index] = eval(
              value.obj
            );
        } 
        else {
            this.state.states.indicatorsAndItemsToBeSelected.push(
              eval(value.obj)
            );
        }
    }
}