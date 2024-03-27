// 发送 POST 请求到 OpenAI API
module.exports = () => {
  return new Promise((resolve, reject) => {
    import('node-fetch').then(fetch => {
      const apiKey = 'OpenAI API 密钥';

      // 定义要发送的数据
      const requestData = {
        prompt: "Once upon a time",
        max_tokens: 50,
        temperature: 0.7
      };
      // 在这里处理 fetch 对象
      fetch.default('https://akh999.top/v1/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify(requestData)
        })
        .then(response => {
          // if (!response.ok) {
          //   throw new Error('Failed to fetch');
          // }
          return response.json();
        })
        // .then(data => {
        //   console.log('--- .then B ---', data);
        //   // console.log(data.choices[0].text); // 输出生成的文本
        // })
        // .catch(error => {
        //   // console.error('Error:', error);
        // });
    }).catch(error => {
      // console.error('Failed to import node-fetch:', error);
    });
  })
}