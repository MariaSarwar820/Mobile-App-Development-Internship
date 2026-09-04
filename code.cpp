#include<iostream>
using namespace std;
int sumOfdigits(int num) {
  int digitsum = 0;

  while(num > 0) {
    int lastdigit = num%10;
    num /= 10;

    digitsum += lastdigit;
  }
    return digitsum;
  }

int main() {
  cout <<"sum =" << sumOfdigits(2356) << endl;
  return 0;
}










