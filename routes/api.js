require('dotenv').config() // Load environment variables from .env file

var db = require('../lib/db.js');

const AIR_DEVICE_NUM = process.env.AIR_DEVICE_NUM
const BULB_DEVICE_NUM = process.env.BULB_DEVICE_NUM
const SMARTTHINGS_KEY = process.env.SMARTTHINGS_KEY
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const axios = require('axios')

const apiRouter = require('express').Router()

apiRouter.post('/controlbulb-on', async function (req, res) {
  // ����, ����, �Һ� ���� �� �ؽ�Ʈ�� ������ ����
  const { userRequest } = req.body
  const utterance = userRequest.utterance

  try {
    const url = `https://api.smartthings.com/v1/devices/${BULB_DEVICE_NUM}/commands`
    const jsonData = {
      commands: [
        {
          component: 'main',
          capability: 'switch',
          command: 'on',
          arguments: [],
          name: 'on',
        },
      ],
    }

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SMARTTHINGS_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    const responseBody = {
      version: '2.0',
      template: {
        outputs: [
          {
            simpleText: {
              text: '������ ������ �������ϴ�.',
            },
          },
        ],
      },
    }

    res.status(200).send(responseBody)
  } catch (error) {
    console.error('������ �߻��߽��ϴ�.', error)
    res.status(500).send('������ �߻��߽��ϴ�.')
  }
})

apiRouter.post('/controlbulb-off', async function (req, res) {
  // ����, ����, �Һ� ���� �� �ؽ�Ʈ�� ������ ����
  const { userRequest } = req.body
  const utterance = userRequest.utterance

  try {
    const url = `https://api.smartthings.com/v1/devices/${BULB_DEVICE_NUM}/commands`
    const jsonData = {
      commands: [
        {
          component: 'main',
          capability: 'switch',
          command: 'off',
          arguments: [],
          name: 'off',
        },
      ],
    }

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SMARTTHINGS_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    const responseBody = {
      version: '2.0',
      template: {
        outputs: [
          {
            simpleText: {
              text: '������ ������ �������ϴ�.',
            },
          },
        ],
      },
    }

    res.status(200).send(responseBody)
  } catch (error) {
    console.error('������ �߻��߽��ϴ�.', error)
    res.status(500).send('������ �߻��߽��ϴ�.')
  }
})

apiRouter.post('/controlbulb-color', async function (req, res) {
  // ���� ���� + ��� ���� �ؽ�Ʈ ������ ����
  const { userRequest } = req.body
  const utterance = userRequest.utterance

  try {
    const url = `https://api.smartthings.com/v1/devices/${BULB_DEVICE_NUM}/commands`
    const jsonData = {
      commands: [
        {
          component: 'main',
          capability: 'colorControl',
          command: 'setHue',
          arguments: [360], // ���� �� (0���� 360����, 0�� ������)
        },
      ],
    }

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SMARTTHINGS_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    const responseBody = {
      version: '2.0',
      template: {
        outputs: [
          {
            simpleText: {
              text: '������ ���� �ٲ�����ϴ�.',
            },
          },
        ],
      },
    }

    res.status(200).send(responseBody)
  } catch (error) {
    console.error('������ �߻��߽��ϴ�.', error)
    res.status(500).send('������ �߻��߽��ϴ�.')
  }
})

apiRouter.post('/controlair-on', async function (req, res) {
  
  db.query('update count set airCnt = airCnt + 1 where cntIdx = 1', function(err, results, fields){
    if(err) throw err;
    console.log(results);
  })
  
  try {
    const { userRequest } = req.body

    if (!userRequest || !userRequest.utterance) {
      // userRequest�� utterance�� ���� ��� ���� ó��
      throw new Error('userRequest�� utterance�� �����ϴ�.')
    }

    const utterance = userRequest.utterance

    // ���� �ڵ�� ��ȿ�� utterance�� �ִ� ��쿡�� ����˴ϴ�.

    const url = `https://api.smartthings.com/v1/devices/${AIR_DEVICE_NUM}/commands`
    const jsonData = {
      commands: [
        {
          component: 'main',
          capability: 'switch',
          command: 'on',
          arguments: [],
          name: 'on',
        },
      ],
    }

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SMARTTHINGS_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    const responseBody = {
      version: '2.0',
      template: {
        outputs: [
          {
            simpleText: {
              text: '���� û������ ������ �������ϴ�.',
            },
          },
        ],
      },
    }

    res.status(200).send(responseBody)
  } catch (error) {
    console.error('������ �߻��߽��ϴ�.', error)
    res.status(500).send('������ �߻��߽��ϴ�.')
  }
})

apiRouter.post('/controlair-off', async function (req, res) {
  // ����û���� ���� ���� �ؽ�Ʈ�� ������ ����
  const { userRequest } = req.body
  const utterance = userRequest.utterance

  console.log(AIR_DEVICE_NUM)

  try {
    const url = `https://api.smartthings.com/v1/devices/${AIR_DEVICE_NUM}/commands`
    const jsonData = {
      commands: [
        {
          component: 'main',
          capability: 'switch',
          command: 'off',
          arguments: [],
          name: 'off',
        },
      ],
    }

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SMARTTHINGS_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    const responseBody = {
      version: '2.0',
      template: {
        outputs: [
          {
            simpleText: {
              text: '���� û������ ������ �������ϴ�.',
            },
          },
        ],
      },
    }

    res.status(200).send(responseBody)
  } catch (error) {
    console.error('������ �߻��߽��ϴ�.', error)
    res.status(500).send('������ �߻��߽��ϴ�.')
  }
})

apiRouter.post('/controlmonitor', function (req, res) {
  // ä��, �Ҹ�, TV, ����� �� �ؽ�Ʈ�� ������ ����
  const { userRequest } = req.body
  const utterance = userRequest.utterance

  const responseBody = {
    version: '2.0',
    template: {
      outputs: [
        {
          simpleText: {
            text: 'monitor: ' + utterance,
          },
        },
      ],
    },
  }

  res.status(200).send(responseBody)
})

// '/chatgpt' ��������Ʈ�� ���� POST ��û �ڵ鷯
apiRouter.post('/chatgpt', async function (req, res) {
  const { userRequest } = req.body
  const utterance = userRequest.utterance

  try {
    // OpenAI API�� �޽��� �����ϰ� ���� �ޱ�
    const resGPT = await getResponse(utterance)

    // ChatGPT ������ īī���� �÷���ģ�� API�� �´� �������� ��ȯ
    const responseBody = {
      version: '2.0',
      template: {
        outputs: [
          {
            simpleText: {
              text: resGPT,
            },
          },
        ],
      },
    }

    // ��ȯ�� ���� ������
    res.status(200).send(responseBody)
  } catch (error) {
    // ���� ������ �� �ڼ��ϰ� ����ϱ�
    console.error('Error calling OpenAI API:')
    console.error('Error message:', error.message)
    if (error.response) {
      console.error('Response status:', error.response.status)
      console.error('Response data:', error.response.data)
    }
    res.status(500).send('Error generating response')
  }
})

// OpenAI API�� �޽����� ������ ������ �޴� �Լ�
async function getResponse(msg) {
  const data = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: msg }],
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        timeout: 200000,
      },
    )

    const result1 = response.data.choices[0].message.content
    return result1
  } catch (e) {
    console.error('OpenAI API ����:', e.response?.data?.error || e.message || e)
    throw e
  }
}

module.exports = apiRouter
