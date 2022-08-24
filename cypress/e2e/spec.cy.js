describe('OOM reproduction', () => {
  const generateLargeRunnerLogEntry = () => {
    cy.fixture('data').then((data) => {
      expect(JSON.stringify(data)).to.include('_id')
    })
    cy.wait(50)
  }
  
  context('when massive runner logs are generated from a single spec', () => {
    it('kills the browser with an out of memory error', () => {
      for(let i=0; i<500; i++) {
        generateLargeRunnerLogEntry()
      }
    })
  })
  
  context('when massive runner logs are generated from multiple specs', () => {
    for(let i=0; i<500; i++) {
      it(`kills the browser with out of memory error - test # ${i}`, () => {
        generateLargeRunnerLogEntry()
      })
    }
  })
})
