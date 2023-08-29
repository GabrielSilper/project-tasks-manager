// somente pra testar se a configuração do jest e ts-jest estão funcionando
const sum = (a: number, b: number): number => a + b;

describe('sum', () => {
  it('should sum two numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
