pipeline {
  agent {
    kubernetes {
      yamlFile('agent-builder.yaml')
    }
  }

  environment {
    REGISTRY_IMAGE = "realkeny/todo-app"
    DOCKER_REGISTRY = "${env.REGISTRY_IMAGE}"
    IMAGE_TAG      = "${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
        steps {
            checkout scm
        }
    }
    
    stage('Install Dependencies & Test') {
        steps {
            container('node') {
                sh 'NODE_OPTIONS="--max-old-space-size=1048" npm ci'
                sh 'npm ci -- --coverage --watchAll=false'
            }
        }
    }
    
    stage('Lint') {
        steps {
            container('node') {
                sh 'npm run lint'
            }
        }
    }
    
    stage('SonarQube Analysis') {
      steps {
          container('sonar-scanner') {              
              // 'SonarQube' must match the server name in Manage Jenkins > System
              withSonarQubeEnv('SonarQube') {
                  sh 'cat /home/jenkins/agent/workspace/TodoApp-Build/sonar-project.properties'                  
                  sh 'sonar-scanner'
              }
          }
      }
    }

    stage('Quality Gate') {
      steps {
          timeout(time: 5, unit: 'MINUTES') {
              // Runs on the default jnlp container; doesn't need node or sonar-scanner
              waitForQualityGate abortPipeline: true
          }
      }
    }
    
    stage('Build') {
        steps {
            container('node') {
                sh 'npm run build'
            }
        }
    }

    stage('Build & Push Container') {
      steps {
        container('kaniko') {
          sh """            
            /kaniko/executor \
              --context `pwd` \
              --dockerfile `pwd`/Dockerfile \
              --destination ${DOCKER_REGISTRY}:${IMAGE_TAG} \
              --destination ${DOCKER_REGISTRY}:latest \
              --snapshot-mode=redo \
              --use-new-run
          """
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        container('kubectl') {
          sh """
            sed -i "s|\${DOCKER_REGISTRY}|${DOCKER_REGISTRY}|g" deployment.yaml
            sed -i "s|\${IMAGE_TAG}|${IMAGE_TAG}|g" deployment.yaml
            kubectl apply -f deployment.yaml -n devops-tools
            kubectl set image deployment/todo-app todo-app=${DOCKER_REGISTRY}:${IMAGE_TAG} -n devops-tools
            kubectl rollout status deployment/todo-app -n devops-tools --timeout=300s
          """
        }
      }
    }
  }
}
